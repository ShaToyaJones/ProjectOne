// Script specific to Spotify API calls

// [] Link in project HTML

// First Spotify API call to get list of featured playlists
var featPlaylists = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/browse/featured-playlists?limit=5",
  "method": "GET",
  "headers": {
    "authorization": "Bearer BQA7pBK68ohtIbEtuD0JMHHG7Q_tL3kRrUoo4jfSu1lBFl0HInqJJUf4tSxx5yXAOCYLX3NeLYFgW7Mrr-Dx2X2tSLdYEsoqPD82aNBgmxkJGzlOrblcDS75_FzHWtm425Nst_QSsw",
    // "cache-control": "no-cache",
    // "postman-token": "64edfafe-4f2d-1f40-fb53-d9c8c6408139"
  }
}

// $.ajax(featPlaylists).done(function (response) {
//   console.log(response);
// });

// ISSUE - Tokens expire
// New ISSUE - "Request header not allowed by Access-Control-Allow-Headers in preflight response" ~FIXED if comment-out cache-control & postman-token


// VARIABLES ====================
// 

// var results = "";



// FUNCTIONS ====================
//




// MAIN PROCESS ====================
// 

// Transfer this to app.js when ready
// Render something from API object length

$(document).ready(function() {


  $.ajax(featPlaylists).done(function (response) {
    
    console.log("ajax response object = ");
    console.log(response);

    var results = response.data;

      console.log("var results = " + results);

      // RESULTS COMING UP UNDEFINED*****************

    for (var featPlaylistsIndex = 0; featPlaylistsIndex < results.length; featPlaylistsIndex++) {

    // var listDiv = $("<div>");
    var listImg = $("<img>");

    listImg.attr({
      "src": results[featPlaylistsIndex].playlists.items.images.url,
    });

    $("#api-tester").append(listImg);

    }

  });



});
