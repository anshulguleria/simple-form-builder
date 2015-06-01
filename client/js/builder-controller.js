(function () {
    var BuilderController = {};

    BuilderController.getElementConfigFor = function (elementName) {
        return elementsConfiguration[elementName];
    };

    BuilderController.formElements = {
        elements: []
    };

    window.BuilderController = BuilderController;
})();
