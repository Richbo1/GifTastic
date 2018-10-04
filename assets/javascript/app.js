$(document).ready(function () {

    
    var topics = ["cars", "gta", "naruto", "skiing", "redbull", "breaking bad"];
    
    function renderButtons(){
        console.log(topics.length)
        for(let i=0;i<topics.length;i++){
            
            var btn = $("<button>");
            btn.addClass("gifBtn");
            btn.attr("data-type",topics[i]);
            btn.text(topics[i]);
            $("#buttons").append(btn);
            
        }
    }
    

    $(document).on("click",'.gifBtn' ,function () {
        $("#images").empty()
        $(".gifBtn").removeClass("active")
        $(this).addClass("active")
        var term = $(this).attr("data-type")
        console.log(term);
        
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response)

                var results = response.data;

                for (j = 0; j < results.length; j++) {
                    
                    var animated = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;

                    var gifDiv = $("<div>");
                    var rating = results[j].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var gif = $("<img>");
                    gif.attr("src", still);
                    gif.attr("data-still", still);
                    gif.attr("data-animate", animated);
                    gif.attr("data-state", "still");
                    gif.addClass("gif-image");

                    gifDiv.append(p);
                    gifDiv.append(gif);
                    $("#images").prepend(gifDiv);



                }
                
            });
    });
    $(document).on("click", ".gif-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        $("#buttons").empty();
        var newGif = $("#newGif").val().trim();
        
        
        topics.push(newGif);

        
        renderButtons(topics,"topicBtn","buttons");
    });

    renderButtons(topics,"topicBtn","buttons");
    
});
