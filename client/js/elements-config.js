var elementsConfiguration = {
    get input() {

        /**
         * It contains the attributes which belongs
         * to the respective DOM element.
         */
        var attributes = {
            get type() {
                return [
                    {
                        // label is the label to show in UI
                        // for getting input settings
                        label: "Text",
                        value: "text"
                    },{
                        label: "Textarea",
                        value: "textarea"
                    }
                ];
            },
            /**
             * This is to handle the any other custom
             * attributes if the need comes.
             */
            get customAttributes () {
                return [];
            }
        };

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
