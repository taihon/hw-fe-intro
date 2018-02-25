(module => {
    class BaseView {
        /**
         * @param {string} text
         */
        _createSpan(text) {
            const span = document.createElement('span');
            span.textContent = text;
            return span;
        }

        /**
         * @param {Element} parent
         */
        _cleanChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }

    module.BaseView = BaseView;
})(window);