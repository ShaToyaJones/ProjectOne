/*----when the page loads*/
$(document).ready(function() {
    // Initial array of food
    var food = [];
    //call the create buttons to display the inital buttons
    createButtons();
    //function for generating and disaplying buttons that will hold the giphys
    function createButtons() {
        //this doesn't recreate the same buttons when a new button is added to the array
        $('#foodButtons').html('');
        //this will dynamically generate buttons for each recipe
        for (i = 0; i < food.length; i++) {
            //adding a variable for button
            var b = $("<button>");
            //adding a class of food to the button
            b.addClass('food');
            //adding the data attribute
            b.attr('data-name', food[i]);
            //provides the initial button text
            b.text(food[i]);
            //add the button to the giphyButtons div
            $('#foodButtons').append(b);
        }
    }

    //this function renders the html to display the giphys
    function displayRecipeImage() {
        var results = response;
        var recipe = $(this).attr('data-name');
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + recipe + "&limitLicense=false&number=4&ranking=1";
        // Performing an AJAX request with the queryURL
        $.ajax({
            headers: {
                "X-Mashape-Key": "O8cILmkawTmsh422cdG88s3nvdobp1Mz7E0jsnq3EpxgBPdyg8",
                "Accept": "application/json"
            },
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //creating a div to hold the recipe image
            var recipeDiv = $("<div>").addClass("recipe");
            //this stores the rating data
            var image = results.image;
            // //create an element to have the rating displayed
            var img = $("<img>").html('Recipe: ' + image).addClass("recImage");
            //putting the recipe giphy below the previous recipe

            ('#imageFood').append(img);
            $('#imageFood').append(recipeDiv);
            console.log(image);

        })
    }
    //this needs to be changed to a firebase event rather than push to array
    // this function handles events where an add recipe button is clicked
    $('#addFood').on("click", function(event) {
        event.preventDefault();
        //this line grabs the input from the textbox
        var newRecipe = $('#foodInput').val().trim().toLowerCase();
        //adding recipe from the textbox to our array
        food.push(newRecipe);
        console.log("new array: " + food);
        createButtons();
    })

    // Adding click event listener to all buttons
    $("html").on('click', "button", function() {

        // Grabbing and storing the data-recipe property value from the button
        var recipe = $(this).attr("data-name");

        // Constructing a queryURL using the recipe name
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + recipe + "&limitLicense=false&number=4&ranking=1";
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
            // storing the data from the AJAX request in the results variable
            var results = response;

            // Looping through each API recipe result 
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var recipeDiv = $("<div>");

                // Creating and storing an image tag
                var recipeImage = $("<img>");
                //this adds the class food to all images
                recipeImage.addClass('gif', food);
                // Setting the src attribute of the image to a property pulled off the result item
                recipeImage.attr("src", results[i].image);

                console.log("This is the image: " + recipeImage);


                // put the recipe image in the recipe div
                recipeDiv.append(recipeImage);

                // display the recipe image to the html
                $("#imageFood").append(recipeDiv);

            }
        })
    });

});

 /*
 curl --get --include 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1' \
  -H 'X-Mashape-Key: 0qEQ0BAHQZmsh2nEFVD8lvoVN4B6p10X2InjsnAJmWNv2J8WT5' \
  -H 'Accept: application/json'
  */

  /*add a separate function for calling the Get analyzed recipe Information part of the api 
  for when the user clicks on the recipe image*/
 

