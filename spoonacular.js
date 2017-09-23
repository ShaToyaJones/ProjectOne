/*----when the page loads*/
$(document).ready(function() {
    // Initial array of food----will need to change this to push to firebase
    var food = [];
   
    //this needs to be changed to a firebase event(check with Laura)rather than push to array
    // this function handles events where an add recipe button is clicked
    $('#addFood').on("click", function(event) {
        event.preventDefault();

        console.log("I was clicked");

        //this line grabs the input from the textbox
        var newRecipe = $('#foodInput').val().trim().toLowerCase();
        //adding recipe from the textbox to our array
        food.push(newRecipe);
        console.log("new array: " + food);
        // createButtons();
        
        
        // Grabbing and storing the data-recipe property value from the button
    

        // Constructing a queryURL using the recipe name
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
            //moved the result variable up to the beginning of the function
            
            console.log(response);
            // Looping through each API recipe result 
            for (var i = 0; i < response.length; i++) {
                // Creating and storing a div tag
                var recipeDiv = $("<div>");

                // Creating and storing an image tag
                var recipeImage = $("<img>");
                //this adds the class food to all images
                recipeImage.addClass('img', food);
                // Setting the src attribute of the image to a property pulled off the result item
                recipeImage.attr("src", response[i].image);

                console.log("This is the image: " + recipeImage);

                // var name = results.title;
                // var title = $("<h3>").text('Rating: ' + name).addClass("recipeName");
                // console.log("This is the title of the recipe using the name variable: " + name);
                // console.log("This is the title of the recipe using the title variable: " + title);

                var recTitle = $('<p>').text(response[i].title);
                console.log(recTitle);

                
                // $('.titleRec').append(title);

            
                // put the recipe image in the recipe div
                recipeDiv.append(recipeImage);
                recipeDiv.append(recTitle);

                // display the recipe image to the html
                $("#imageFood").append(recipeDiv);

            }
        })
    });


    });

   

 

