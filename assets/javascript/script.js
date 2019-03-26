$(document).ready(function() {

    // Initial array of activities
    var activity = ['kayaking', 'swimming', 'biking', 'rock-climbing', 'ziplining', 'slacklining', 'bouldering', 'camping', 'stargazing'];

    //FUNCTION for buttons
    function renderButtons() {
        //deleting activity prior to adding new activity to prevent repeat buttons
        $("#buttons-view").empty();

        //rendering buttons for iniitial activities;
        for (var i = 0; i < activity.length; i++) {
            var a = $("<button>"); //jquery command for new button
            a.addClass("activity"); //adding class of "activity" to our button
            a.attr("data-name", activity[i]); //adds data-attribute
            a.text(activity[i]); // provides initial button text
            $("#buttons-view").append(a); //adding button to the HTML
            }

       //Generate 10 giphys for the activities
        $("button").on("click", function () {
        var activity = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=EAOLvM8XoVuxWGsU6hBcEtl3rtl6Nkl8&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
            var activityDiv = $("<div style='display: inline-block; margin: 0px 10px'; class='activityDiv'>");
            var pDiv = $("<p>");
            var pDiv = $("<p>").text("Rating: " + results[j].rating);
            var activityImage = $("<img>");
            activityImage.attr('src',results[j].images.fixed_height_still.url);
            activityDiv.append(activityImage);
            activityDiv.append(pDiv);
            $("#gifs-appear-here").prepend(activityDiv);
            }
          });
      }); //close function to generate giphys
       
  }; //close renderbutton function

    //call renderbuttons function
    renderButtons();

    //FUNCTION to handle events when "add-activity" button is clicked
    $("#add-activity").on("click", function(event) {
        event.preventDefault(); //prevents buttons default behavior when clicked (which is submitted a form)
        var newActivity = $("#activity-input").val().trim() //grabs input from the textbox
        activity.push(newActivity);
        renderButtons();
    });

  // FUNCTION to Animate/Still GIPHY on button click
  $("body").on("click", "activityDiv", function () {
    let state = $(this).attr("data-state");
    if (state === "still") {
        let animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
        state = $(this).attr("data-state");
    } else {
        let still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
        state = $(this).attr("data-state");
    }
  });
  
}); //closing document write function