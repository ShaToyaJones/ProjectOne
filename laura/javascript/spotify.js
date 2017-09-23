// Script specific to Spotify API calls

// [] Link in project HTML


// ISSUE - Tokens expire
// New ISSUE - "Request header not allowed by Access-Control-Allow-Headers in preflight response" ~FIXED if comment-out cache-control & postman-token


// VARIABLES ====================
// 




// FUNCTIONS ====================
//

// Q: Will want the ajax call in a function to call in the app.js script?




// MAIN PROCESS ====================
// 

// Transfer this to app.js when ready
// Render something from API object length

$(document).ready(function() {

  // First Spotify API call to get list of featured playlists
  var featPlaylists = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/browse/featured-playlists?limit=5",
    "method": "GET",
    "headers": {
      "authorization": "Bearer BQABgiEpN2Yf_bU7d2uiRvhR1lyscGafzZhi9j0Ni1P_H5gFzbHr6igW4QUwokTWuyluKWJ8qnz13yRgJRBXSlQm92GVSfd_xQuUL7QrbpXt2AO8e34s9x4tkEjZQbwXRcO11Hzkjw",
      // "cache-control": "no-cache",
      // "postman-token": "64edfafe-4f2d-1f40-fb53-d9c8c6408139"
    }
  } 
  $.ajax(featPlaylists).done(function (response) {
    
    // Log results of the featured playlists ajax call
    console.log(response);
    // console.log(response.message);
    // console.log(response.playlists);

    // Save call results to new variable
    var results = response.playlists.items;

      console.log(results);
      // console.log(results.items);

      for (var k = 0; k < results.length; k++) {

        var listDiv = $("<div>");

        // This for now is adding the ID text to the page. Needed to test if I was drilling into the object or not  ~WORKS
        var listId = $("<p>").text("Playlist ID: " + results[k].id);

        // Grabs image from ajax object and renders on page  ~WORKS
        var listImg = $("<img>");
        listImg.attr("src", results[k].images[0].url);

        listDiv.append(listId);
        listDiv.append(listImg);

        $("#api-tester").append(listDiv);
      };
    
  });
  // ^^Closes AJAX call

});
// ^^Closes document-ready
