// JavaScript for MealGrooves Application
// Steps to complete:
// [] Will need this script tag in HTML******
// <script src="https://www.gstatic.com/firebasejs/4.4.0/firebase.js"></script>
// [] Link in project HTML

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCOld_3clEWG1PqcEi5ashd3oedI8f_EY",
  authDomain: "meal-grooves.firebaseapp.com",
  databaseURL: "https://meal-grooves.firebaseio.com",
  projectId: "meal-grooves",
  storageBucket: "meal-grooves.appspot.com",
  messagingSenderId: "948740357477"
};
firebase.initializeApp(config);




// VARIABLES ====================
// 

// Stores Firebase database connection
var database = firebase.database();
var dateAdded = "";

// Will store music search term from form input
var music = "";

// Will store search term from Firebase database
var musicSearchTerm = "";

// Will store ingredients search terms from form input
// var ingredients = "";




// FUNCTIONS ====================
//




// MAIN PROCESS ====================
// 

$(document).ready(function() {

	// TESTING : Search input and submit to test Firebase syncing and playlist searching
  // Will need to work with Toya's inputs for final
  $("#search-submit").on("click", function() {

    event.preventDefault();

    // console.log("Submit was clicked!");

    // Captures value of input field
    music = $("#music-search").val().trim().toLowerCase();
    	// console.log(music);

    // Clears input fields on submit
    $("#search-form").trigger("reset");

    // Send values to Firebase 
    database.ref().push( {
    	musicSearch: music,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });
  // ^^Closes submit on-click

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

  	var snap = snapshot.val();
  		// console.log("You searched: " + snap.musicSearch);

  	// So..... how to capture snap.musicSearch so it can be used in the query URL for a playlist search cal....
  	// Declare new global var of musicSearchTerm = "";

  	musicSearchTerm = snap.musicSearch;
  		// console.log(musicSearchTerm);

  	// Use this var in query URL for playlist search (in spotify.js)
  	// Doesn't work with multi word inputs*********  ~MAYBE??
  	// Call a function here with it built on the other sheet??
  	// renderPlayer();
  	searchPlaylists();
  });

});
// ^^Closes doc ready