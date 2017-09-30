// JavaScript for MealGrooves Application
// Steps to complete:
// [x] Will need this script tag in HTML******
// <script src="https://www.gstatic.com/firebasejs/4.4.0/firebase.js"></script>
// [x] Link in project HTML

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

  //JavaScript and jQuery for Materialize to function
  Materialize.updateTextFields();
  $(".button-collapse").sideNav();
  $("select").material_select();    
  $("#textarea1").val("");
  $("#textarea1").trigger("autoresize");

  $("#playlist-covers").empty();

  // On-click for form submit button
  $("#search-submit").on("click", function() {

    event.preventDefault();

      // console.log("Submit was clicked!");

    $("#playlist-covers").empty();
    
    if ($("#music-search").val().length !== 0) {
      // IF MUSIC INPUT THEN SEARCH & SEARCH...

      // Captures value of music input field
      music = $("#music-search").val().trim().toLowerCase();
        console.log(music);

      // Captures value of ingredients input field
      food = $("#enterIngredients").val().trim().toLowerCase();
        console.log(food);

      // Clears input fields on submit
      $("#search-form").trigger("reset");

    } else {

      // Captures value of music input field
      music = "browse";
        console.log(music);

      // Captures value of ingredients input field
      food = $("#enterIngredients").val().trim().toLowerCase();
        console.log(food);

      // Clears input fields on submit
      $("#search-form").trigger("reset");

    };
    // ^^Closes if/else

    // Send values to Firebase 
      database.ref().set( {
        musicSearch: music,
        ingredientSearch: food,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      database.ref().on("value", function(snapshot) {

        var snap = snapshot.val();
          // console.log(snap);
          console.log("You searched for: " + snap.musicSearch + " and " + snap.ingredientSearch);

        ingredientSearchTerm = snap.ingredientSearch;
          // console.log(ingredientSearchTerm);

        // Want to add ingredientSearchTerm to the page.... where should that go????
        // Might also need to clear the div when form resubmitted  ~NOPE! B/c does it when FB value changes *brushes shoulders off*
        $("#searched").html("Showing meals for: " + ingredientSearchTerm);

        musicSearchTerm = snap.musicSearch;
          // console.log(musicSearchTerm);

    });
    // ^^Closes database.ref function

    searchRecipeByIngredients();
      console.log("searchRecipeByIngredients called");

    if (musicSearchTerm === "browse") {

          browseFeatured();
            console.log("browseFeatured called");

        } else {

          searchPlaylists();
            console.log("searchPlaylists called");

        };
 
  });
  // ^^Closes search-submit on-click

});
  // ^^Closes doc ready