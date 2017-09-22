

// First Spotify API call to get list of featured playlists
var featPlaylists = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/browse/featured-playlists?limit=5",
  "method": "GET",
  "headers": {
    "authorization": "Bearer BQDc3bb-EM3Y9MJjYA3CobhT4mfHziPKaNQr0Xyh4N8F65tPRykuj-R218bN2OobboOhg8FiXTzbOIGGup-Zyw",
    "cache-control": "no-cache",
    "postman-token": "53b54575-1285-7bc4-941b-1599a3f5fedf"
  }
}

$.ajax(featPlaylists).done(function (response) {
  console.log(response);
});