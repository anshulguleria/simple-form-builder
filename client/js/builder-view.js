(function () {
    let BuilderView = {
    };

    let controller = BuilderController;

    BuilderView.registerPartials = function ($elems) {
        $elems = $elems || $('script[id$=-partial]');
        [].forEach.call($elems, elem => {
            this.registerPartial($(elem))
        });
    };

    BuilderView.registerPartial = function ($partialEle) {
        let name = $partialEle.prop('id').split('-partial')[0];
        Handlebars.registerPartial(name, $partialEle.html());
    };

    BuilderView.registerHelpers = function () {
        // equality helper
        Handlebars.registerHelper('equal', function (firstVal, secondVal, options) {
            var result = false;
            if(options.hash.strict === true) {
                result = firstVal === secondVal;
            } else {
                result = firstVal == secondVal;
            }
            if(result) {
                return options.hash.pass;
            } else {
                return options.hash.fail;
            }
        });
    };

    BuilderView.init = function () {
        this.registerPartials();
        this.registerHelpers();

        this.render();
        this.setupEvents();
    };

    /**
     * Setup initial events like add functionality
     */
    BuilderView.setupEvents = function () {
        // add event for add element
        $('.jadd-ele').on('click.addele', function (ev) {
            let elementType = $(ev.target).attr('data-element');
            if(!elementType) { return };
            this.addElement(elementType, "edit");
            ev.preventDefault();
        }.bind(this));
    };

    BuilderView.setEditEvents = function (elementType) {
    };

    function _processTemplate(context, templateHtml) {
        let compiledTemplate = Handlebars.compile(templateHtml);
        let renderedTemplate = compiledTemplate(context);
        return renderedTemplate;
    }

    function _appendHtml (markup, $parentEle, clearPrevious) {
        if(clearPrevious === true) {
            // clear previous markup
            $parentEle.html("");
        }
        // append current markup
        $parentEle.html($parentEle.html() + markup);
    }

    function _render (context, templateHtml, $parentEle, clearPrevious = false) {
        let processedHtml = _processTemplate(context, templateHtml);
        _appendHtml(processedHtml, $parentEle, clearPrevious);
    }

    /**
     * Render view for form builder
     */
    BuilderView.render = function () {
        let context = controller.formElements.elements;
        let template = $('script#builder_view').html();
        let initialHtml = _processTemplate(context, template);
        let $formContainer = $(initialHtml).find('form#form_elements');

        // add markup as per element
        // like input-render template for input element, etc
        context.forEach(function (eleInfo) {
            BuilderView.appendElement(eleInfo, $formContainer);
        });

        _render(context, template, $('#form_container'), true);
    };

    BuilderView.appendElement = function (eleInfo, $parent) {
        $parent = $parent || $('#form_elements');
        let eleMarkup = this.getEleHtml(eleInfo.type, eleInfo.isEditMode ? "edit" : "render", eleInfo);
        _appendHtml(eleMarkup, $parent);
    };

    BuilderView.appendAttribute = function (attrInfo, $parent) {
        let eleTemplate = $('script#attribute_edit-partial').html();
        // since we dont need to attach any events here
        // thus no need for getAttrHtml function
        _render(attrInfo, eleTemplate, $parent);
    };

    /**
     * Updates the markup of element, i.e. re-render
     * element template
     */
    BuilderView.updateElement = function (eleInfo) {
        // since getelehtml also binds events thus events gets binded again
        var eleHtml = this.getEleHtml(eleInfo.type, eleInfo.isEditMode?"edit":"render", eleInfo);
        $('#ele_' + eleInfo.id).replaceWith(eleHtml);
    };

    /**
     * provides rendered markup and also applies requried events.
     */
    BuilderView.getEleHtml = function (elementType, state, context) {
        let eleTemplate = $('#' + elementType).html();
        let eleMarkup = _processTemplate(context, eleTemplate);
        this.setEleEvents(elementType, state, $(eleMarkup));
        return eleMarkup;
    };

    /**
     * setEleEvents
     * Sets events for elements for edit and render state
     * @param {string} elementType
     * @param {string} state
     * @param {jquery object} $ele
     */
    BuilderView.setEleEvents = function (elementType, state, $ele) {
        /** edit events:
         * add attribute event
         * remove attribute event
         * switch to render state
         * save on foucsout event
         */
        let id = $ele.attr('id');
        if(state === 'edit') {
            // save event
            $('body').on('click.save', '#' + id + ' .j-edit-save', function (ev) {
                let $ele = $('#' + id);
                let eleId = $ele.attr('data-id');
                let eleType = $ele.attr('data-ele-type');

                this.saveElement(eleId, $ele, eleType)
                .then(eleInfo => {
                    eleInfo = controller.switchState(eleId, "render")
                    // remove any events not required
                    this.removeEleEvents(elementType, state, $ele);
                    this.updateElement(eleInfo)
                });
            }.bind(this));

            // add attribute event
            $('body').on('click.addattr', '#' + id + ' .j-add-attr', function (ev) {
                let $ele = $('#' + id);
                let eleId = $ele.attr('data-id');

                let attrName = $(ev.target).attr('data-attr');
                console.log('starting attribute adding process');
                this.removeEleEvents(elementType, state, $ele);
                this.addAttribute(eleId, attrName, $ele.find('.j-selected-attrs'));
            }.bind(this));

        }
        /**
         * render event:
         * switch to edit state
         * later: any validations or custom events attached
         */
        else if(state === 'render') {
            $('body').on('click.edit', '#' + id + ' .j-render', function (ev) {
                // write handling to switch from render to edit
                // state.
                // i.e.
                // * read values from eleconfig
                // * add those values to your config as per selected values
                // * render the edit view
                // * enable/disable any bindings required

                // calculating these properties inside cuz before
                // this event trigger $ele was not appended in html
                let $ele = $('#' +  id);
                let eleId = $ele.attr('data-id'),
                    eleType = $ele.attr('data-ele-type');

                var eleInfo = controller.getEleInfoAt(eleId);
                var eleInfo = controller.generateEditEleInfo(eleInfo);
                eleInfo.isEditMode = true;
                console.log('reconstructed data as: ', eleInfo);
                // remove any events present on this markup
                this.removeEleEvents(elementType, state, $ele);
                this.updateElement(eleInfo);
            }.bind(this));
        }
        /**
         * render event:
         * switch to edit state
         * later: any validations or custom events attached
         */
    };

    /**
     * saveElement
     * Saves element info by readind from ui and passing
     * it to controller to save.
     * @param {Number} eleId Position of element in array
     * @param {jquery object} $ele ui element to save
     * @param {string} eleType
     * @return {Promise}
     */
    BuilderView.saveElement = function (eleId, $ele, eleType) {
        let eleInfo = { };
        // TODO: make this reading info part
        // as generic so as when new elements are added no
        // new code is to be added
        if(eleType === 'input') {
            eleInfo = this._readInputInfo($ele);
        }
        // add general porperties
        eleInfo.id = eleId;
        // since after  we need to switch to render
        // mode thus set isEditMode to false
        eleInfo.isEditMode = false;
        // TODO: since position will be changed as per
        // ordering thus find position of this element in ui
        // and set that value as position. Currently we
        // dont support drag and drop thus position
        // in ui and array will be same.
        eleInfo.position = eleId;

        console.log('read data as: ', eleInfo);
        return controller.saveElement(eleInfo.id, eleInfo);
    };

    /**
     * _readInputInfo
     * @private
     * Reads data from dom of edit input element settings
     * and returns the elementInfo object
     * @param {jquery object} $ele
     * @return {object}
     */
    BuilderView._readInputInfo = function ($ele) {
        let eleInfo = {};
        eleInfo.label = $ele.find('.j-inp-label').val();
        eleInfo.attributes = [];
        let $configElements = $ele.find('.j-attr-config');
        Array.prototype.forEach.call($configElements, function (ele) {
            // TODO: read attribute information. See attribute
            // object from ele-config file
            let $ele = $(ele);
            eleInfo.attributes.push({
                name: (function () {
                    var isCustom = $ele.attr('data-custom');
                    if(isCustom === 'true') {
                        return $ele.find('.j-attr-label').val();
                    } else {
                        return $ele.attr('data-name');
                    }
                })(),
                value: (function () {
                    let $option = $ele.find('.j-attr-options'),
                        $inputVal = $ele.find('.j-attr-value');
                    if($option.length) {
                        return $option.val();
                    } else if($inputVal.length) {
                        return $inputVal.val();
                    }
                })(),
                // true default because present in attributes list
                isSelected: true,
                // this field need not be read
                // since this can be picked from config
                // when editing
                //options: null,
                // this feild will also be read from cofig
                // while switching to edit mode
                //isDefault: false
            });
        });
        return eleInfo;
    };

    /**
     * removes the events set in set function
     */
    BuilderView.removeEleEvents = function (elementType, state, $ele) {
        var id = $ele.attr('id');
        /** edit events:
         * add attribute event
         * remove attribute event
         * switch to render state
         * save on foucsout event
         */
        if(state === 'edit') {
            $('body').off('click.save', '#' + id + ' .j-edit-save');
            $('body').off('click.addattr', '#' + id + ' .j-add-attr');
        }
        /**
         * render event:
         * switch to edit state
         * later: any validations or custom events attached
         */
        else if(state === 'render') {
            $('body').off('click.edit', '#' + id + ' .j-render');
        }
    };



    BuilderView.addElement = function (elementType, state) {
        let context = controller.addElement(elementType, state);
        if(!elementType) {
            // ask for element type
            // then call appendElement
        } else {
            this.appendElement(context);
            // call appendElement
        }
    };

    BuilderView.addAttribute = function (eleId, attrName, $parent) {
        let eleInfo = controller.addAttribute(eleId, attrName);
        eleInfo.isEditMode = true;
        // TODO: rather than updating whole element
        // update only attribute section
        this.updateElement(eleInfo);
        //this.appendAttribute(attrInfo, $parent);
    };

    window.BuilderView = BuilderView;
})();
