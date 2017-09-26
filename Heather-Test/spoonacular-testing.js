/*----when the page loads*/
$(document).ready(function() {
    // Initial array of food----will need to change this to push to firebase
    var food = [];
   
    //this needs to be changed to a firebase event(check with Laura)rather than push to array
    // this function handles events where an add recipe button is clicked
    $('#addFood').on("click", function(event) {
        event.preventDefault();

        $("#userDir").text("Click on an image to get the recipe");

        //this line grabs the input from the textbox
        var newRecipe = $('#foodInput').val().trim().toLowerCase();
        //adding recipe from the textbox to our array
        food.push(newRecipe);
        console.log("new array: " + food);
            

        // Constructing a queryURL using the user input stored in the newRecipe variable
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + 
        newRecipe + "&limitLicense=false&number=4&ranking=1";

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

            }
        })
    });
    /*create an onclick function which calls the Get recipe information 
    create a link that will show step by step instructions, ingredient list, 
    the recipe title, image, and time to make*/
    $("body").on("click", "img", function(event) {
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
        recipeImage.addClass('img', food);
        // Setting the src attribute of the image to a property pulled off the result item
        recipeImage.attr("src", data.image);
        console.log(data);
        var recTitle = $("<span class='card-title'>").text(data.title);
        var ingredientList = '';
        for(i in data.extendedIngredients){
            ingredientList += data.extendedIngredients[i].originalString + '<br>';
        }
        var ingredList = $("<p>").html("Ingredients: " + ingredientList);
        var timeToMake = $("<p>").text("Total Time: " + data.readyInMinutes);
        var servings = $("<p>").text("Serving Size: " + data.servings);
        var directions = $("<p>").text("Directions: " + data.instructions);
        //setting the src attribute to multiple properties pulled off the data from JSON
        // recipeClicked.addClass("img", recipe);
        recipeClicked.attr("src", data.image);
        

        recipeDetailDiv.append(recTitle);
        recipeDetailDiv.append(recipeImage);
        recipeDetailDiv.append(ingredList);
        recipeDetailDiv.append(timeToMake);
        recipeDetailDiv.append(servings);
        recipeDetailDiv.append(directions);
        var recipeDetailCard = $("<div class='card light-blue lighten-5'>").append(recipeDetailDiv);
        
        $("#imageFood").append(recipeDetailCard);
        console.log(recTitle);
        console.log(ingredList);
        console.log(timeToMake);
        console.log(servings);
        console.log(directions);

   
    })
     });

    });

/*
<script src="https://www.gstatic.com/firebasejs/4.4.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrxXBy3T5g8zAgijTgYmc3C_H_QQmexlo",
    authDomain: "meal-grooves-app.firebaseapp.com",
    databaseURL: "https://meal-grooves-app.firebaseio.com",
    projectId: "meal-grooves-app",
    storageBucket: "",
    messagingSenderId: "149220257930"
  };
  firebase.initializeApp(config);
</script>*/


