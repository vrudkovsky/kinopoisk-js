const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=5ca5769f4cf4fbeb1cab5ffdc28fd011&language=en-US&query=' + searchText;
    requestApi('GET', server);

}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    
    const request = new XMLHttpRequest();
    // console.log('request: ', request);
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', function() {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
            console.log('error: ', request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function (item) {
            let nameItem = item.name || item.title;
            let date = item.first_air_date || item.release_date;
            console.log(date);
            inner = inner + `<div class="col-4">${nameItem} [${date}]</div>`;
        });
        movie.innerHTML = inner;


        console.log(output);
    });
    

    return url;
}