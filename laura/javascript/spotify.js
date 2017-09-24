// Script specific to Spotify API calls


// ISSUES TO SOLVE ====================
// 
// [] Need to link in Toya's main HTML
// [] Tokens expire!!!
// [x] "Request header not allowed by Access-Control-Allow-Headers in preflight response" ~FIXED if comment-out cache-control & postman-token
// [] Tokens need to be called from this script, not getting token from Postman
// Q: Will want the ajax call in a function to call in the app.js script?  ~dno't think this matters.... Firebase is more the concern for the app.js


// VARIABLES ====================
// 

var listUri = "";


// FUNCTIONS ====================
//

function renderPlayer() {

  // Renders music player with selected playlist based on playlist cover clicked on

  $("#player").empty();

  // listUri in scope?  ~FIXED, declared as empty in global
  var playerSrc = "https://open.spotify.com/embed?uri=" + listUri + "&theme=white";
    
    console.log(playerSrc);

  var player = $("<iframe>");

    player.attr( { 
      "src": playerSrc,
      "width": 300,
      "height": 300,
      "frameborder": 0,
      "allowtransparancy": true
    });

  // Renders music player to page
  $("#player").append(player);
};




// MAIN PROCESS ====================
// 

// Transfer this to app.js when ready?
// Render something from API object length  ~WORKS

$(document).ready(function() {

  // First Spotify API call to get list of FEATURED playlists
  // Token comes from Postman code; NEED TO CHANGE THIS*********
  var featPlaylists = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/browse/featured-playlists?limit=6",
    "method": "GET",
    "headers": {
      "authorization": "Bearer BQCFELl3hcKOcxML6dDvwKVTWhGQ929nNJ9TITKaXoC_TOzBElnGIkoLa6s5w6UIU7TuZpAoESrYjoTRFbwKEQ",
      // "cache-control": "no-cache",
      // "postman-token": "64edfafe-4f2d-1f40-fb53-d9c8c6408139"
    }
    // "data": "\"grant_type\": \"client_credentials\"\n\"token_type\": \"Bearer\",\n\"expires_in\": 86400,"
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
        listImg.attr("data-uri", results[k].uri);
        // ^^^COMBINE THESE ATTRS *********************

        listImg.addClass("listGif");

        listDiv.append(listId);
        listDiv.append(listImg);

        $("#api-tester").append(listDiv);
      };
    
  });
  // ^^Closes AJAX call

  $(this).on("click", ".listGif", function() {

    // console.log("Playlist image clicked!");

    // Stores value of URI from playlist cover image clicked
    listUri = $(this).attr("data-uri");

      console.log("URI: " + listUri);

    // [x] When playlist image is clicked, needs to send URI to web player source link.....
    // Store this as function similar to renderButtons in giphy HW?
    // So call function here to run on-click  ~YEP YEP!

    renderPlayer();
    

  });

});
// ^^Closes document-ready
