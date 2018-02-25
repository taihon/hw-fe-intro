(module => {
    class Loader {
        constructor(loaderElement, ...elementsToHide) {
            this._loaderElement = loaderElement;
            this._elementsToHide = elementsToHide || [];
        }

        start() {
            this._setLoading(true);
        }

        stop() {
            this._setLoading();
        }

        /**
         * @private
         * @param {boolean} isLoading
         */
        _setLoading(isLoading) {
            this._loaderElement.hidden = !isLoading;
            for (const element of this._elementsToHide) {
                element.hidden = isLoading;
            }
        }
    }

    // export
    module.Loader = Loader;
})(window);