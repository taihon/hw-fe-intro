(module => {
    const BaseView = module.BaseView;

    class PersonView extends BaseView {
        /**
         * @param {Element} infoPanel
         * @param {Element} headElement
         */
        constructor(infoPanel, headElement) {
            super();
            this._infoPanel = infoPanel;
            this._headElement = headElement;
        }

        get currentPersonId() {
            return +(this._infoPanel.dataset.personId || 0);
        }

        set currentPersonId(id) {
            this._infoPanel.dataset.personId = id;
        }

        setPerson(person) {
            this._cleanChildren(this._infoPanel);
            ['name', 'hair_color', 'skin_color', 'eye_color', 'gender']
                .forEach(field => {
                    const fieldSpan = this._createSpan(`${field}: ${person[field]}`);
                    this._infoPanel.appendChild(fieldSpan);
                });
            this.currentPersonId = person.id;
            const { hair_color, eye_color } = person;
            this._updateHead(hair_color, eye_color);

        }

        _updateHead(hair, eye) {
            Array.from(this._headElement.classList)
                .forEach(c => {
                    if (c.startsWith('hair') || c.startsWith('eye')) {
                        this._headElement.classList.remove(c);
                    }
                });
            this._headElement.classList.add(`hair-${hair}`);
            this._headElement.classList.add(`eye-${eye}`);
        }
    }

    module.PersonView = PersonView;
})(window);