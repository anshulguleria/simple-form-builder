(function () {
    var BuilderController = {};

    BuilderController.getElementConfigFor = function (elementName) {
        return elementsConfiguration[elementName];
    };

    /**
     * Generaes object for editing element configuration.
     * It takes input from render data.
     */
    BuilderController.generateEditEleInfo = function (renderInfo) {
        var editInfo = {
            id: renderInfo.id,
            type: renderInfo.type,
            isEditMode: renderInfo.isEditMode,
            position: renderInfo.position,
            label: renderInfo.label
        };
        let eleConfig = this.getElementConfigFor(renderInfo.type);
        // clone attributes from config
        editInfo.attributes = $.extend(true, [], eleConfig.attributes);

        // enable attributes present in renderInfo and
        // push any additional attributes
        renderInfo.attributes.forEach(function (rendAttrib) {
            let attribMatch = false;
            for(let i=0; i< editInfo.attributes.length; i++) {
                if(rendAttrib.name === editInfo.attributes[i].name) {
                    editInfo.attributes[i].value = rendAttrib.value;
                    // also set selected option if options present
                    if(editInfo.attributes[i].options) {
                        let options = editInfo.attributes[i].options;
                        for(let optIterator = 0; optIterator<options.length; optIterator++) {
                            if(options[optIterator].value === rendAttrib.value) {
                                options[optIterator].isSelected = true;
                                break;
                            }
                        }
                    }
                    editInfo.attributes[i].isSelected = true;
                    attribMatch = true;
                    break;
                }
            }

            // this calculation is not correct
            if(!attribMatch) {
                // i.e. its custom attribute
                editInfo.attributes.push({
                    // custom attributes dont have label
                    // since their name becomes label
                    //label: rendAttrib.label,
                    name: rendAttrib.name,
                    value: rendAttrib.value,
                    isSelected: true,
                    get isDefault() { return false; },
                    // this will make label, name and value
                    // all editable
                    get isCustom() { return true; },
                    get options() { return null; }
                });
            }
        });
        editInfo.attributes.forEach(attrib => {
        });

        return editInfo;
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

    BuilderController.addAttribute = function (elePos, attrName) {
        let eleInfo = this.formElements.elements[elePos];
        let editInfo = this.generateEditEleInfo(eleInfo);
        if(attrName === 'custom') {
            // push new custom attibute
            let attrInfo = {
                // this feild is not used
                //label: 'custom label',
                name: 'data-custom',
                value: 'custom value',
                isSelected: true,
                get isDefault() { return false; },
                get isCustom() { return true; },
                get options() { return null; }
            };
            eleInfo.attributes.push(attrInfo);
        } else {
            // make already present element selected
            eleInfo.attributes.forEach(attr => {
                if(attr.name === attrName) {
                    attr.isSelected = true;
                }
            });
        }
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

    BuilderController.getEleInfoAt = function (elePos) {
        return this.formElements.elements[elePos];
    };

    window.BuilderController = BuilderController;
})();
