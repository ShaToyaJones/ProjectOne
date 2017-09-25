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

// Will store music search term returned from Firebase database
var musicSearchTerm = "";

// Will store ingredients search terms from form input
var food = [];

// Will store ingredients search terms returned from Firebase database
var ingredientSearchTerm = "";



// FUNCTIONS ====================
//




// MAIN PROCESS ====================
// 

$(document).ready(function() {

	// TESTING : Search input and submit to test Firebase syncing and playlist searching
  // Will need to work with Toya's inputs for final
  $("#search-submit").on("click", function() {

    event.preventDefault();

    console.log("Submit was clicked!");

    // Captures value of music input field
    music = $("#music-search").val().trim().toLowerCase();
    	// console.log(music);

    // Captures value of ingredients input field
    food = $("#enterIngredients").val().trim().toLowerCase();
      // console.log(food);

    // Clears input fields on submit
    $("#search-form").trigger("reset");

    // WANT TO HAVE IF/ELSE TO RUN EITHER MUSIC SEARCH OR FEATURED PLAYLIST BROWSE
    // Might need to stick with featured playlists for now until we get all the searching scripts linked..........

    // if #music-search is empty AND featured-playlists is checked
    // $("#music-search") === null &&
    // if ( 
    // $("#featured-search").prop("checked") === true) {
    // 	console.log("Browse playlists");
    // };
    // run browseFeatured();
    // else
    // if #music-search isn't empty
    // run the following

    browseFeatured();
    // ^^Keep function call outside of Firebase sync
    // Not syncing Featured Playlist data to Fb

    // $("#playlist-covers").empty();
    // ^^Need a way to clear out playlist covers on each search submit*************

    // Send values to Firebase 
    database.ref().push( {
    // database.ref().set( {
    	musicSearch: music,
      ingredientSearch: food,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });
  // ^^Closes submit on-click

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

  	var snap = snapshot.val();
  		console.log("You searched for: " + snap.musicSearch + " and " + snap.ingredientSearch);

    ingredientSearchTerm = snap.ingredientSearch;
      console.log(ingredientSearchTerm);

    // Need Heather's function to search recipes to call here
    // RECIPE SEARCH FUNCTION
    searchRecipeByIngredients();


    // So..... how to capture snap.musicSearch so it can be used in the query URL for a playlist search cal....
    // Declare new global var of musicSearchTerm = "";
    // ^^Pretty sure this is working now....

  	musicSearchTerm = snap.musicSearch;
  		console.log(musicSearchTerm);

  	searchPlaylists();

  });

});
// ^^Closes doc ready