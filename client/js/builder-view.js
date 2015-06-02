(function () {
    var BuilderView = {
    };

    var controller = BuilderController;

    BuilderView.init = function () {
        this.render();
        this.setupEvents();
    };

    /**
     * Setup initial events like add functionality
     */
    BuilderView.setupEvents = function () {
        // add event for add element
        $('.jadd-ele').on('click.addele', function (ev) {
            var elementType = $(ev.target).attr('data-element');
            if(!elementType) { return };
            this.addElement(elementType, "edit");
            ev.preventDefault();
        }.bind(this));
    };

    BuilderView.setEditEvents = function (elementType) {
    };

    function _processTemplate(context, templateHtml) {
        var compiledTemplate = Handlebars.compile(templateHtml);
        var renderedTemplate = compiledTemplate(context);
        return renderedTemplate;
    }

    function _appendHtml (markup, $parentEle, clearPrevious) {
        if(clearPrevious === true) {
            // clear previous markup
            $parentEle.html("");
        }
        // append current markup
        $parentEle.html($parentEle.html() + processedHtml);
    }

    function _render (context, templateHtml, $parentEle, clearPrevious = false) {
        var processedHtml = _processTemplate(context, templateHtml);
        _appendHtml(processedHtml, $parentEle, clearPrevious);
    }

    /**
     * Render view for form builder
     */
    BuilderView.render = function () {
        var context = controller.formElements;
        var template = $('#builder-view').html();
        var initialHtml = _processTemplate(context, template);
        // add markup as per element
        // like input-render template for input element, etc
        context.forEach(function (ele) {
            var eleMarkup = BuilderView.getEleHtml(ele.type, ele.isEditMode ? "edit" : "render", ele);
            _appendHtml(eleMarkup, initialHtml.find('#form_container'));
        });

        _render(context, template, $('#form_container'), true);
    };

    /**
     * provides rendered markup and also applies requried events.
     */
    BuilderView.getEleHtml = function (elementType, state, context) {
        var eleTemplate = $('#' + elementType + '-' + state).html();
        var eleMarkup = _processTemplate(context, eleTemplate);
        this.setEleEvents(elementType, state, $(eleMarkup));
    };
    BuilderView.setEleEvents = function (elementType, state, $ele) {
    };
    BuilderView.removeEleEvents = function (elementType, state, $ele) {
    };

    BuilderView.appendElement = function (eleInfo) {
        var eleMarkup = this.getEleHtml(eleInfo.type, eleInfo.isEditMode ? "edit" : "render", ele);
        _appendHtml(eleMarkup, $('#form_container'));
    };

    BuilderView.addElement = function (elementType, state) {
        var context = controller.addElement(elementType, state);
        if(!elementType) {
            // ask for element type
            // then call appendElement
        } else {
            this.appendElement(elementType, state);
            // call appendElement
        }
    };

    window.BuilderView = BuilderView;
})();
