
const loader = new window.Loader(
    document.getElementsByClassName('loader')[0],
    document.getElementsByClassName('head')[0],
    document.getElementsByClassName('person-info')[0]
);

const personService = new window.PersonService(loader);
const filmService = new window.FilmService(loader);
const personView = new window.PersonView(
    document.getElementsByClassName('person-info')[0],
    document.getElementsByClassName('head')[0]
);

document.getElementById('next').addEventListener('click', ($event) => {
    personService.loadByIdAsync(personView.currentPersonId + 1)
        .then(person => {
            personView.setPerson(person);
            return person;
        })
        .then(person => filmService.loadTitlesForPerson(person.films))
        .then(personView.setFilmTitles.bind(personView))
        .catch(err => {
            alert(err.message);
            throw err;
        });
});

document.getElementById('prev').addEventListener('click', ($event) => {
    personService.loadByIdAsync(personView.currentPersonId - 1)
        .then(person => {
            personView.setPerson(person);
            return person;
        })
        .then(person => filmService.loadTitlesForPerson(person.films))
        .then(personView.setFilmTitles.bind(personView))
        .catch(err => {
            alert(err.message);
            throw err;
        });
});

