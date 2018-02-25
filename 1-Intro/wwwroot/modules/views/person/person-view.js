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
            const { hair_color, eye_color, skin_color } = person;
            this._updateHead(hair_color, eye_color, skin_color);
        }

        setFilmTitles(films) {
            let ul = document.getElementsByTagName('ul')[0] || this._createList('Film list');
            ul.parentElement && ul.parentElement.removeChild(ul);
            this._cleanChildren(ul);
            films.forEach(film => {
                const child = document.createElement('li');
                child.textContent = film.title;
                ul.appendChild(child);
            });
            this._infoPanel.appendChild(ul);
        }

        _updateHead(hair, eye, skin) {
            Array.from(this._headElement.classList)
                .forEach(c => {
                    if (c.startsWith('hair') || c.startsWith('eye') || c.startsWith('skin')) {
                        this._headElement.classList.remove(c);
                    }
                });
            let [primaryHair, secondaryHair] = hair.split(',').map(el => el.trim().replace('/', ''));
            this._headElement.classList.add(`hair-${primaryHair}`);
            secondaryHair && this._headElement.classList.add(`hair-secondary-${secondaryHair}`);
            this._headElement.classList.add(`eye-${eye}`);
            let [primarySkin, secondarySkin] = skin.split(',').map(el => el.trim());
            this._headElement.classList.add(`skin-${primarySkin}`);
            secondarySkin && this._headElement.classList.add('skin-multi', `skin-secondary-${secondarySkin}`);
        }
    }

    module.PersonView = PersonView;
})(window);