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
            let inner = '<h2 class="col-12 text-center text-info">Search results</h2>';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center  text-info">There is no result on your search</h2>';
            };
            output.results.forEach(function (item) {
                let name = item.name || item.title;
                let img = item.poster_path;
                const poster = img ? urlPoster + img : './img/noposter.jpg';
                // let date = item.first_air_date || item.release_date;
                let dataInfo = '';
                if (item.media_type != 'person') {
                    dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                }
                inner += `
                <div class="col-12 col-md-6 col-xl-3 item">
                    <img src="${poster}" class="img_poster" alt="${name}" ${dataInfo}></img> 
                    <h5>${name}</h5>
                </div>
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch(function(reason) {
            movie.innerHTML = 'Upps! Something goes wrong!!!';
            console.log(reason);
        });
}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
    const media  = movie.querySelectorAll('img[data-id]');
    media.forEach(function(elem) {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}

function showFullInfo() {
    let url = '';

    if(this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/'+ this.dataset.id +'?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US';
    } else if(this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/'+ this.dataset.id +'?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US';
    } else {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Error occured please try again later</h2>';
    }
    
    fetch(url)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            } 
            return value.json();
        })
        .then(function(output) {
            // console.log(output);
            movie.innerHTML = `
            <h4 class="col-12 text-center text-info">${output.name || output.title}</h4>
            <div class="col-4">
            <img src='${urlPoster + output.poster_path}' alt='${output.name || output.title}'>
            ${(output.homepage) ? `<p class='text-center'><a href="${output.homepage}" target="_blank">Official page</a></p>` : ''} 
            ${(output.homepage) ? `<p class='text-center'><a href="https://imdb.com/title/${output.homepage}">IMDB link</a></p>` : ''} 
            </div>
            <div class="col-8">
            <p>Rating: ${output.vote_average}</p>
            <p>Status: ${output.status}</p>
            <p>Premiere: ${output.first_air_date || output.release_date}</p>
            ${(output.last_episode_to_air) ? `<p>${output.number_of_seasons} season; ${output.last_episode_to_air.episode_number} episodes came out;</p>` : '' }
            <p>Description: ${output.overview}</p>
            <br>
            <div class="youtube"></div>
            </div>
            `;
            
            getVideo();
            console.log(this);
                
            })	
            .catch(function(reason) {
                movie.innerHTML = 'Upps! Something goes wrong!!!';
                console.log(reason);
            });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page has been loaded');
    
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011')
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            } 
            return value.json();
        })
        .then(function(output) {
            let inner = '<h2 class="col-12 text-center text-info">Popular items of the week</h2>';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center  text-info">There is no result on your search</h2>';
            };
            output.results.forEach(function (item) {
                let name = item.name || item.title;
                let img = item.poster_path;
                const poster = img ? urlPoster + img : './img/noposter.jpg';
                // let date = item.first_air_date || item.release_date;
                let dataInfo = '';
                if (item.media_type != 'person') {
                    dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                }
                inner += `
                <div class="col-12 col-md-6 col-xl-3 item">
                    <img src="${poster}" class="img_poster" alt="${name}" ${dataInfo}></img> 
                    <h5>${name}</h5>
                </div>
                `;
            });
            movie.innerHTML = inner;

            
            

            addEventMedia();

        })
        .catch(function(reason) {
            movie.innerHTML = 'Upps! Something goes wrong!!!';
            console.log(reason);
        });
});

function getVideo() {
    let youtube = movie.querySelector('.youtube');
    fetch(`https://api.themoviedb.org/3/movie/524047/videos?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US`)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            } 
            return value.json();
        })
        .then((output) => {
            // console.log(output);
            // console.log(output.results[0]);
        })
        .catch(function(reason) {
            youtube.innerHTML = 'Upps! Something goes wrong!!!';
            console.log(reason);
        });
}