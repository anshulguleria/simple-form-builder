(function () {
    var BuilderView = {
    };

    var controller = BuilderController;

    BuilderView.init = function () {

    };

    BuilderView.render = function () {

    };

    BuilderView.appendElement = function (context) {
        var template = Handlebars.compile($('#templ-' + context.name).html());
        var $formElements = $('#form_elements');
        $formElements.html($formElements.html() + template.html(context));
    };

    function _addElement(elementType) {
        var config = controller.getElementConfigFor(elementType);
        BuilderView.appendElement(config);
    };

    BuilderView.addElement = function (elementType) {
        if(!elementType) {
            // ask for element type
            // then call _addElement
        } else {
            // call _addElement
        }
    };
})();
