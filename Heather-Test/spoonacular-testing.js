/*----when the page loads*/
$(document).ready(function() {
    $('#addFood').on("click", function(event) {
        event.preventDefault();

        console.log("I was clicked");
        //Call the function that makes the request to the API
        searchRecipeByIngredients();
    });

function searchRecipeByIngredients() {
// $("#userDir").text("Click on an image to get the recipe");

    // // sets newRecipe to the value of ingredientSearchTerm, which is returned from Firebase in app.js
    // var newRecipe = ingredientSearchTerm;
    
    // // ####SEE IF THIS LOGS FIRST!!!!!!!!!!!!!  ~WORKS
    // console.log("Ingredient search term is: " + ingredientSearchTerm);
    //this line grabs the input from the textbox
    var newRecipe = $('#foodInput').val().trim().toLowerCase();

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
          var recipeDiv = $(" <div class='card-content'>");

              // ^^^Wondering if this work better as just "<div>", then a separate .addClass for "card-content light-blue" #lcb

          // Creating and storing an image tag
          var recipeImage = $("<img width=300px height=auto>");
            //this adds the class food to all images
            recipeImage.addClass("food");
            // Setting the src attribute of the image to a property pulled off the result item
            recipeImage.attr("src", response[i].image);
            recipeImage.attr('data-id',response[i].id);

            console.log("This is the image: " + recipeImage);

            var recTitle = $("<span class='card-title'>").text(response[i].title);
                
                // put the recipe image in the recipe div
                recipeDiv.append(recipeImage);
                recipeDiv.append(recTitle);
                var recipeCard = $("<div class='card'>").append(recipeDiv)
                // display the recipe image to the html
                $("#imageFood").append(recipeCard);
            };
        });
        // ^^^Closes ajax1 done function
};
    /*create an onclick function which calls the Get recipe information 
    create a link that will show step by step instructions, ingredient list, 
    the recipe title, image, and time to make*/
    $("body").on("click", ".food", function(event) {
        /*to make it switch to another page, location.href- #maybe add the id
        look into the id tag*/
        event.preventDefault();
        console.log("The Image was clicked");
        //need to grab the image id of the specific image clicked
        var imgId = $(this).attr("data-id");
        console.log(imgId);
   

        var query2URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + imgId + "/information?includeNutrition=false"
        console.log(query2URL);

        $.ajax({
            headers: {
                "X-Mashape-Key": "O8cILmkawTmsh422cdG88s3nvdobp1Mz7E0jsnq3EpxgBPdyg8",
                "Accept": "application/json"
            },
            url: query2URL,
            method: "GET"
    }).done(function(data) {
            $("#imageFood").html('');
            $("#userDir").text("");
    
            console.log(data);
    /*display the step 
    by step instructions, ingredient list, 
    the recipe title, image, and time to make
    *and possibly push them to firebase */

    
        var recipeDetailDiv = $("<div class='card-content'>");
        var recipeClicked = $("<img width=800px height=auto>");
        var recipeImage = $("<img width=300px height=auto>");
        //this adds the class food to all images
        recipeImage.addClass("food");
        // Setting the src attribute of the image to a property pulled off the result item
        recipeImage.attr("src", data.image);
        var recTitle = $("<span class='card-title'>").text(data.title);
        var ingredientList = '';
        for(i in data.extendedIngredients){
            ingredientList += data.extendedIngredients[i].originalString + '<br>';
        }
        var ingredList = $("<p>").html("Ingredients: " + ingredientList);
        var timeToMake = $("<p>").text("Total Time: " + data.readyInMinutes);
        var servings = $("<p>").text("Serving Size: " + data.servings);
        var directions = $("<p>").text( data.instructions);
        //setting the src attribute to multiple properties pulled off the data from JSON
        // recipeClicked.addClass("img", recipe);
        recipeClicked.attr("src", data.image);
        

        
        recipeDetailDiv.append(recipeImage);
        recipeDetailDiv.append(recTitle);
        recipeDetailDiv.append(ingredList);
        recipeDetailDiv.append(timeToMake);
        recipeDetailDiv.append(servings);
        recipeDetailDiv.append(directions);
        var recipeDetailCard = $("<div class='card'>").append(recipeDetailDiv);
        
        $("#imageFood").append(recipeDetailCard);

   
    })
     });

});




