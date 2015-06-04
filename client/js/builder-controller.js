(function () {
    var BuilderController = {};

    BuilderController.getElementConfigFor = function (elementName) {
        return elementsConfiguration[elementName];
    };

    BuilderController.formElements = {
        elements: []
    };

    BuilderController.addElement = function (eleType, state) {
        var eleInfo = {
            type: eleType,
            isEditMode: state === 'edit',
            // this property will be used when we provide dragdrop
            // of form elements
            position: this.formElements.elements.length
        };
        var eleConfig = this.getElementConfigFor(eleType);
        eleInfo.attributes = eleConfig.attributes;
        eleInfo.label = eleConfig.label;

        this.formElements.elements.push(eleInfo);
        console.log('adding item to controller', this.formElements.elements);
        return eleInfo;
    };

    window.BuilderController = BuilderController;
})();
