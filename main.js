const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEO_URL = "https://www.youtube.com/watch?v="

function apiRequest(searchTerm, callback) {
	const request = {
		part: 'snippet',
		type: 'video',
		key: 'AIzaSyBwAa8RqOvWflXZmip-3b9i1sBGDEVZQNQ',
		q: searchTerm
	}
	$.getJSON(YOUTUBE_SEARCH_URL, request, callback);
}

function renderHTML(result) {
  return `
    <div class='result-video'>
      <a href="${VIDEO_URL}${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}" alt='${result.snippet.title}'></a>
      <br>
      <a class="js-result-name" href="${VIDEO_URL}${result.id.videoId}" target="_blank">${result.snippet.title}</a>
    </div>
  `;
}


function displayVideos(data) {
  const results = data.items.map(item => renderHTML(item));
  $('.results').html(results);
}


function handleSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    const searchTermInput = $(this).find('.input-box');
    const searchQuery = searchTermInput.val();
    searchTermInput.val("");
    apiRequest(searchQuery, displayVideos);
  });
}

$(handleSubmit);