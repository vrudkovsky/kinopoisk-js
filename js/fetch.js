const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US&query=' + searchText;
    movie.innerHTML = 'Loading ...';

    fetch(server)
        .then(function(value) {
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let date = item.first_air_date || item.release_date;
                console.log(date);
                inner = inner + `<div class="col-12 col-md-4 col-xl-3">${nameItem} [${date}]</div>`;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Upps! Something goes wrong!!!';
            console.log('error: ', reason.status);
        });
        
}

searchForm.addEventListener('submit', apiSearch);
