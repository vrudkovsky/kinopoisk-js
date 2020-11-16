const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center  text-danger">Put text in form for search</h2>';
        return;
    }

    const server = 'https://api.themoviedb.org/3/search/multi?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            } 
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center  text-info">There is no result on your search</h2>';
            };
            output.results.forEach(function (item) {
                let name = item.name || item.title;
                let img = item.poster_path;
                const poster = img ? urlPoster + img : './img/noposter.jpg';
                // let date = item.first_air_date || item.release_date;
                inner += `
                <div class="col-12 col-md-6 col-xl-3 item">
                    <img src="${poster}" class="img_poster"></img> 
                    <h5>${name}</h5>
                </div>
                `;
            });
            movie.innerHTML = inner;

            const media  = movie.querySelectorAll('.item');

            media.forEach(function(elem) {
                elem.addEventListener('click', showFullInfo);
            })
        })
        .catch(function(reason) {
            movie.innerHTML = 'Upps! Something goes wrong!!!';
            console.log(reason);
        });
        
}

searchForm.addEventListener('submit', apiSearch);

function showFullInfo() {
    console('Hi');
}
