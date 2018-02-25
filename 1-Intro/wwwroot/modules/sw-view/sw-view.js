
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

const loadPersonData = id => {
    personService.loadByIdAsync(id)
        .then(person => {
            personView.setPerson(person);
            return person;
        })
        .then(person => filmService.loadFilmTitles(person.films))
        .then(personView.setFilmTitles.bind(personView))
        .catch(err => {
            alert(err.message);
            throw err;
        });
};
document.getElementById('next').addEventListener('click', ($event) => 
    loadPersonData(personView.currentPersonId + 1));

document.getElementById('prev').addEventListener('click', ($event) =>
    loadPersonData(personView.currentPersonId - 1));

