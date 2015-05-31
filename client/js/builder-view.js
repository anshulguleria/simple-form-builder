(function () {
    var BuilderView = {
    };

    var controller = BuilderController;

    BuilderView.init = function () {
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


    BuilderView.render = function () {

    };

    BuilderView.appendElement = function (elementType) {
        var context = controller.getElementConfigFor(elementType);
        var template = Handlebars.compile($('#' + elementType + '-edit').html());
        var $formElements = $('#form_elements');
        $formElements.html($formElements.html() + template(context));
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
