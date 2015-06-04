var elementsConfiguration = {
    get input() {

        /**
         * It contains the attributes which belongs
         * to the respective DOM element.
         */
        var attributes = [
            {
                // read-only property
                get name() { return "Type" },
                // read-only property
                get value() { return "type" },
                // decide weather this will be present
                // by default or not
                isSelected: true,
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
                get name() { return "Placeholder" },
                get value() { return "placeholder" },
                isSelected: false,
                options: null,
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
