const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US&query=' + searchText;
    movie.innerHTML = 'Loading ...';

    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output) {
            console.log(output);
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let date = item.first_air_date || item.release_date;
                let img = item.poster_path;
                inner += `
                <div class="col-12 col-md-4 col-xl-3 item">
                    <img src="${urlPoster + img}"></img> 
                    <h5>${nameItem} </h5>
                </div>
                `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Upps! Something goes wrong!!!';
            console.log(reason);
        });
        
}

searchForm.addEventListener('submit', apiSearch);
