(module => {
    class FilmService {
        /**
         * @param {Loader} loader
         */
        constructor(loader) {
            this._loader = loader;
        }

        /**
         * @param {uri} id
         * @returns {Promise<Object>}
         */
        loadByUriAsync(uri) {
            this._loader.start();
            const xhr = new XMLHttpRequest();
            xhr.open('GET', uri, true);
            const promise = new Promise((resolve, reject) => {
                xhr.onload = () => {
                    this._loader.stop();
                    if (xhr.status !== 200) {
                        reject(new Error(`${xhr.status} ${xhr.statusText}`));
                    } else {
                        const film = JSON.parse(xhr.responseText);
                        resolve(film);
                    }
                }
            });
            xhr.send();
            return promise;
        }
        /**
         * @param {uri} id
         * @returns {Promise<Object>}
         */
        loadTitlesForPerson(uriArray) {
            return Promise.all(uriArray.map(uri => this.loadByUriAsync(uri)));
        }

    }
    module.FilmService = FilmService;
})(window)