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

// Will store music search term from form input
var music = "";

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
    music = $("#music-search").val().trim();
    	console.log(music);

    // Clears input fields on submit
    $("#search-form").trigger("reset");

    // Needs to sync to Firebase next*********

  });

});