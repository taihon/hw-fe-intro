(module => {
    class PersonService {
        /**
         * @param {Loader} loader
         */
        constructor(loader) {
            this._loader = loader;
        }

        /**
         * @param {number} id
         * @returns {Promise<Object>}
         */
        loadByIdAsync(id) {
            // about promises https://learn.javascript.ru/promise
            this._loader.start();
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://swapi.co/api/people/${id}/`, true);
            const promise = new Promise((resolve, reject) => {
                xhr.onload = () => {
                    this._loader.stop();
                    if (xhr.status !== 200) {
                        reject(new Error(`${xhr.status} ${xhr.statusText}`));
                    } else {
                        const person = JSON.parse(xhr.responseText);
                        person.id = id;
                        resolve(person);
                    }
                };
            })
            xhr.send();
            return promise;
        }
    }

    module.PersonService = PersonService;
})(window);