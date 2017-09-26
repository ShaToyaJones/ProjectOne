// ##LAURA STARTED EDITING THIS FILE 9/25/17
// ##MOVED TO LOCAL FOLDER FOR TESTING

// Need both API call searches to be functions #lcb
// Need to be able to call them in app.js #lcb

// Will call RECIPE SEARCH FUNCTION in app.js
// (thinking...) Then on-click of recipe image will reference back to this spoonacular.js to run the second AJAX query/search function (*so doesn't -need- to be in a function of it's own)

function searchRecipeByIngredients() {

  // $("#userDir").text("Click on an image to get the recipe");

  // sets newRecipe to the value of ingredientSearchTerm, which is returned from Firebase in app.js
  var newRecipe = ingredientSearchTerm;
    
    // ####SEE IF THIS LOGS FIRST!!!!!!!!!!!!!  ~WORKS
    console.log("Ingredient search term is: " + ingredientSearchTerm);

  // Constructing a queryURL using the user input stored in the newRecipe variable
  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + newRecipe + "&limitLicense=false&number=4&ranking=1";

    console.log(queryURL);
        
    // Performing an AJAX request with the queryURL
    $.ajax({
      headers: {
        "X-Mashape-Key": "O8cILmkawTmsh422cdG88s3nvdobp1Mz7E0jsnq3EpxgBPdyg8",
        "Accept": "application/json"
      },
        url: queryURL,
        method: "GET"
        
    // After data comes back from the request
    }).done(function(response) {
      
      $("#imageFood").html('');
            
        console.log(response);
        
        // Looping through each API recipe result 
        for (var i = 0; i < response.length; i++) {
          // Creating and storing a div tag
          var recipeDiv = $(" <div class='card-content light-blue lighten-5'>");

              // ^^^Wondering if this work better as just "<div>", then a separate .addClass for "card-content light-blue" #lcb

          // Creating and storing an image tag
          var recipeImage = $("<img width=300px height=auto>");
            //this adds the class food to all images
            recipeImage.addClass('img', food);
            // Setting the src attribute of the image to a property pulled off the result item
            recipeImage.attr("src", response[i].image);
            recipeImage.attr('data-id',response[i].id);

              console.log("This is the image: " + recipeImage);

            var recTitle = $("<span class='card-title'>").text(response[i].title);
                
                // put the recipe image in the recipe div
                
                recipeDiv.append(recTitle);
                recipeDiv.append(recipeImage);
                var recipeCard = $("<div class='card light-blue lighten-5'>").append(recipeDiv)
                // display the recipe image to the html
                $("#imageFood").append(recipeCard);
            };
        });
        // ^^^Closes ajax1 done function
};
// ^^Closes searchByIngredients function

// DELETED EVERY LINE BELOW "when the page loads"
/*----when the page loads*/



