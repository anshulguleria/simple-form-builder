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
            isEditMode: state === 'edit'
        };
        var eleConfig = this.getElementConfigFor(eleType);
        eleInfo.attributes = eleConfig.attributes;
        eleInfo.selectedAttributes = eleInfo.attributes.filter(function (attr) {
            return attr.isDefault;
        });
        eleInfo.label = eleConfig.label;

        this.formElements.elements.push(eleInfo);
        console.log('adding item to controller', this.formElements.elements);
        return eleInfo;
    };

    window.BuilderController = BuilderController;
})();
