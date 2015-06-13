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
            id: this.formElements.elements.length,
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

    BuilderController.switchState = function(elemPos, newState) {
        let elemData = this.formElements.elements[elemPos];
        elemData.isEditMode = (newState === 'edit');
        return elemData;
    };

    /**
     * saveElement
     * Find and update eleInfo of the provided
     * element and returns saved object.
     * @param {Number} eleId
     * @param {object} elemData
     * @return {Promise}
     */
    BuilderController.saveElement = function (elePos, elemData) {
        // create a promise and after
        // save is successful resolve that promise
        let elemInfo = this.formElements.elements[elePos];
        // update values
        elemInfo.isEditMode = elemData.isEditMode;
        elemInfo.position = elemData.position;
        elemInfo.attributes = elemData.attributes;
        elemInfo.label = elemData.label;

        return {
            then: function (fn) {
                fn(elemInfo);
            }
        };
    };

    window.BuilderController = BuilderController;
})();
