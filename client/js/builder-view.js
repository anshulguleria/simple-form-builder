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
            this.addElement(elementType);
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

        _render(context, template, $('#form_container'), true);
    };

    BuilderView.appendElement = function (elementType) {
        var context = controller.getElementConfigFor(elementType),
            templateHtml = $('#' + elementType + '-edit').html(),
            $formElements = $('#form_elements');
        _render(context, templateHtml, $formElements);
    };

    function _addElement(elementType) {
        var config = controller.getElementConfigFor(elementType);
        BuilderView.appendElement(config);
    };

    BuilderView.addElement = function (elementType) {
        if(!elementType) {
            // ask for element type
            // then call appendElement
        } else {
            this.appendElement(elementType);
            // call appendElement
        }
    };

    window.BuilderView = BuilderView;
})();
