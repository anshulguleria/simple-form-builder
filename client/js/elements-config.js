var elementsConfiguration = {
    get input() {

        /**
         * It contains the attributes which belongs
         * to the respective DOM element.
         */
        var attributes = [
            {
                // read-only property
                get label() { return "Type" },
                // read-only property
                get name() { return "type" },
                // this will be property selected from options or
                // some string value when taken input as
                // text. e.g. placeholder
                value: "text",
                // decide weather this will be present
                // by default or not
                isSelected: true,
                // decided weather it can be removed or not
                isDefault: true,
                isCustom: false,
                options: [
                    {
                        // label is the label to show in UI
                        // for getting input settings
                        label: "Text",
                        value: "text",
                        // for default selection
                        isSelected: true
                    },{
                        label: "Number",
                        value: "number",
                        isSelected: false
                    }
                ]
            }, {
                get label() { return "Placeholder" },
                get name() { return "placeholder" },
                value: "",
                isSelected: false,
                // decides this value can be removed or not
                isDefault: false,
                isCustom: false,
                options: null
            }, {
                get label() { return "Name" },
                get name() { return "name" },
                value: "",
                isSelected: false,
                // decides this value can be removed or not
                isDefault: false,
                isCustom: false,
                options: null
            }

        ];

        var events = {
        };

        var validations = {
        };

        // label for the element.
        // e.g. Name: <input type="">
        var label = "label";
        return {
            attributes,
            events,
            validations,
            label
        };
    }
};
