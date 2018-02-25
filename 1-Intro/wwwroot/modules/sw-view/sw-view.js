
const loader = new window.Loader(
    document.getElementsByClassName('loader')[0],
    document.getElementsByClassName('head')[0],
    document.getElementsByClassName('person-info')[0]
);

const personService = new window.PersonService(loader);

const personView = new window.PersonView(
    document.getElementsByClassName('person-info')[0],
    document.getElementsByClassName('head')[0]
);

document.getElementById('next').addEventListener('click', ($event) => {
    personService.loadByIdCallback(personView.currentPersonId + 1, (err, person) => {
        if (err) {
            alert(err.message);
            throw err;
        }
        personView.setPerson(person);
    });
});

document.getElementById('prev').addEventListener('click', ($event) => {
    personService.loadByIdPromise(personView.currentPersonId - 1)
        .then(personView.setPerson.bind(personView))
        .catch(err => {
            alert(err.message);
            throw err;
        });
});

