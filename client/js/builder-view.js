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
        let template = $('#builder_view').html();
        let initialHtml = _processTemplate(context, template);
        // add markup as per element
        // like input-render template for input element, etc
        context.forEach(function (ele) {
            let eleMarkup = BuilderView.getEleHtml(ele.type, ele.isEditMode ? "edit" : "render", ele);
            _appendHtml(eleMarkup, initialHtml.find('#form_container'));
        });

        _render(context, template, $('#form_container'), true);
    };

    /**
     * provides rendered markup and also applies requried events.
     */
    BuilderView.getEleHtml = function (elementType, state, context) {
        let eleTemplate = $('#' + elementType + '-' + state).html();
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
        /**
         * render event:
         * switch to edit state
         * later: any validations or custom events attached
         */
    };

    /**
     * removes the events set in set function
     */
    BuilderView.removeEleEvents = function (elementType, state, $ele) {
        /** edit events:
         * add attribute event
         * remove attribute event
         * switch to render state
         * save on foucsout event
         */
        /**
         * render event:
         * switch to edit state
         * later: any validations or custom events attached
         */
    };

    BuilderView.appendElement = function (eleInfo) {
        let eleMarkup = this.getEleHtml(eleInfo.type, eleInfo.isEditMode ? "edit" : "render", eleInfo);
        _appendHtml(eleMarkup, $('#form_elements'));
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

    window.BuilderView = BuilderView;
})();
