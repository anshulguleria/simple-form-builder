var elementsConfiguration = {
    get input() {
        var attributes = {
            get type() {
                return [
                    {
                        label: "Text",
                        value: "text"
                    },{
                        label: "Textarea",
                        value: "textarea"
                    }
                ];
            },
            get customAttributes () {
                return [];
            }
        };

        var events = {
        };

        var validations = {
        };
        return {
            attributes,
            events,
            validations
        };
    }
};
