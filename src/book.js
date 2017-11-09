var selectedStory;
var selectedChoice;
var currentStory = 0;
var currentPage = "pageStart";
var newSound = stories[0].pageStart.sound;
  console.log(newSound);

// FIREBASE AUTHENTICATION
var config = {
        apiKey: "AIzaSyAWUtB7pvGbWyUCdRJl0cLuf2_Ln0dWI5A",
        authDomain: "purple-tree-5f62c.firebaseapp.com",
        databaseURL: "https://purple-tree-5f62c.firebaseio.com",
        projectId: "purple-tree-5f62c",
        storageBucket: "",
        messagingSenderId: "699925334051"
      };
      firebase.initializeApp(config);

      var provider = new firebase.auth.GithubAuthProvider();

        function githubSignin() {
           firebase.auth().signInWithPopup(provider)
           
           .then(function(result) {
              var token = result.credential.accessToken;
              var user = result.user;
                
              console.log(token)
              console.log(user)
           }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
                
              console.log(error.code)
              console.log(error.message)
           });
        }

        function githubSignout(){
           firebase.auth().signOut()
           
           .then(function() {
              console.log('Signout successful!')
           }, function(error) {
              console.log('Signout failed')
           });
        }


       //  //FACEBOOK AUTHENTICATION
       //  function statusChangeCallback(response) {
       //   console.log('statusChangeCallback');
       //   console.log(response);
       //   if (response.status === 'connected') {
       //     testAPI();
       //   } else {
       //     document.getElementById('status').innerHTML = 'Please log ' +
       //       'into this app.';
       //   }
       // }

       
       //    function checkLoginState() {
       //   FB.getLoginStatus(function(response) {
       //     statusChangeCallback(response);
       //   });
       // }
       

       // window.fbAsyncInit = function() {
       // FB.init({
       //   appId      : '1994680544133095',
       //   cookie     : true,  // enable cookies to allow the server to access
       //                       // the session
       //   xfbml      : true,  // parse social plugins on this page
       //   version    : 'v2.8' // use graph api version 2.8
       // });

       // // Now that we've initialized the JavaScript SDK, we call
       // // FB.getLoginStatus().  This function gets the state of the
       // // person visiting this page and can return one of three states to
       // // the callback you provide.  They can be:
       // //
       // // 1. Logged into your app ('connected')
       // // 2. Logged into Facebook, but not your app ('not_authorized')
       // // 3. Not logged into Facebook and can't tell if they are logged into
       // //    your app or not.
       // //
       // // These three cases are handled in the callback function.

       // FB.getLoginStatus(function(response) {
       //   statusChangeCallback(response);
       // });

       // };

       // // Load the SDK asynchronously
       // (function(d, s, id) {
       //   var js, fjs = d.getElementsByTagName(s)[0];
       //   if (d.getElementById(id)) return;
       //   js = d.createElement(s); js.id = id;
       //   js.src = "//connect.facebook.net/en_US/sdk.js";
       //   fjs.parentNode.insertBefore(js, fjs);
       // }(document, 'script', 'facebook-jssdk'));

       // // Here we run a very simple test of the Graph API after login is
       // // successful.  See statusChangeCallback() for when this call is made.
       // function testAPI() {
       //   console.log('Welcome!  Fetching your information.... ');
       //   FB.api('/me', function(response) {
       //     console.log('Successful login for: ' + response.name);
       //     document.getElementById('status').innerHTML =
       //       'Thanks for logging in, ' + response.name + '!';
       //   });
       // }


$(document).ready(function() {
    
	mainHTML();

    $(".story-title").on("click", function(event){
    selectedStory = $(this).text();

		var newStoryIndex =  $(".story-title").index(this);
		currentStory = newStoryIndex;
    var waitDiv = $("<div>");
    waitDiv.attr("id", "wait-div");
    var wait = $("<img>");
    wait.attr("src", "images/giphy.gif");
    waitDiv.append(wait);
    $(".main-area").html(waitDiv);
      setTimeout(function(){
      storyHTML(currentPage);
      }, 1000);
		

    });

    $("#github").on("click", function(){
        githubSignin();
      })

    $("#facebook").on("click", function(){
        checkLoginState();
      })
});

function mainHTML() {
       	for (var i = 0; i < stories.length; i++) {
			var books = $("<a>");
			books.addClass("story-title");
			books.attr("data-index", i);
			books.text(stories[i].storyTitle);
			$(".story").append(books);
		}
	};

$(document).on("click", ".choice", function() {
  var sound = $(this).attr("data-sound");
  var queryURL = "https://freesound.org/apiv2/search/text/?query="+newSound+"&filter=type:mp3&sort=duration_asc&token=0dLPbWt3qJbyxXWL3lfGKUHW575Bv5ThsCxITVEW";
          
          var queryURL2 = "https://freesound.org/apiv2/sounds/51715/"; 

              $.ajax({
                  url: queryURL,
                  method: "GET"
                })
                .done(function(response) {
                  var results = response.data;
                  console.log(response)
                });

              $.ajax({
                  url: queryURL2,
                  method: "GET",
                  headers: {"Authorization": "Token JkKEUZNbmrCvQMQGlaW9OaKdash40HKv1a4Tl5Cm"}
                  })
                  .done(function(response) {
                    var results = response.previews;
                    console.log(results["preview-hq-mp3"]);

                    //create audio element and assign it to a variable
                    var storySound = document.createElement("Audio");
                    //attribute the sound file
                    storySound.setAttribute("src", results["preview-hq-mp3"]);
                    storySound.load();
                    storySound.play();
                  });
              

});

$(document).on("load", ".img-story", function() {

  //identify vars to pull data from the story//
  
     });

function storyHTML(currentPage) {
  
var newGif = stories[currentStory][currentPage].topic;
  console.log(newGif);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGif + "&rating=g&api_key=NfjGwXVTVCgEGMawDPEr5a6iJRkDaNTJ&limit=1"

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          console.log(response);
          // var gifDiv = $("<div class='storyDiv'>");
          var storyImage =  $("<img>");
            // $(selector).attr(attribute,value)
            storyImage.addClass("gif");
            //set data-state to still by default
            storyImage.attr("data-state", "still");

            storyImage.attr("src", results[0].images.fixed_width.url);
            // storyImage.attr("data-animate", results[0].images.fixed_width.url); 
            // storyImage.attr("data-still", results[0].images.fixed_width_still.url);
            // gifDiv.prepend(storyImage);

            storyDiv.append(storyImage);
            console.log(storyDiv);
          });
       
      //  $(document).on("click", ".gif", function() {
      //   // make a variable named state and then store the image's data-state into it. Use the .attr() method for this.
      //   var state = $(this).attr("data-state");

      //       console.log(state);
       
      //   // Check if the variable state is equal to 'still',
      //   // then update the src attribute of this image to it's data-animate value, and update the data-state attribute to 'animate'.

      //   // If state is equal to 'animate', then update the src attribute of this
      //   // image to it's data-still value and update the data-state attribute to 'still'
        
      //   if(state === "still") {
      //     var animateURL = $(this).attr("data-animate");
      //     $(this).attr("src", animateURL);
      //     $(this).attr("data-state", "animate");
      //   }

      //   else {
      //     var stillURL = $(this).attr("data-still");
      //     $(this).attr("src", stillURL);
      //       $(this).attr("data-state", "still");
      //   }

      // });


	var storyHTML = "<h1>" + stories[currentStory].storyTitle + "</h1>";
    $(".main-area").html(storyHTML);
    var storyDiv = $("<div>");
    storyDiv.attr("id", "story-div");
    // var storyImg = $("<img>");
    // storyImg.addClass("img-story");
    // storyImg.attr("src", "https://via.placeholder.com/350x350");
    // storyDiv.append(storyImg);
    var storyText = $("<p>");
    storyText.addClass("text");
    storyText.text(stories[currentStory][currentPage].text);
    storyDiv.append(storyText);
    $(".main-area").append(storyDiv);
        $.each(stories[currentStory][currentPage].nextPage, function(k, v) {
            //display the key and value pair
            var choiceBtn = $("<button>");
            choiceBtn.addClass("text-center btn btn-warning btn-lg choice");
            // choiceBtn.attr("src", results["preview-hq-mp3"]);
            choiceBtn.text(v);
            choiceBtn.on("click", function(event){
              var waitDiv = $("<div>");
              waitDiv.attr("id", "wait-div");
              var wait = $("<img>");
              wait.attr("src", "images/giphy.gif");
              waitDiv.append(wait);
              $(".main-area").html(waitDiv);
            setTimeout(function(){
            choiceUpdate(k);
            }, 1000);
                
            })
            $(".main-area").append(choiceBtn);

        });        

    
};

function choiceUpdate(choice){
    // console.log(choice);
    if (choice.indexOf("Story") > -1){
        if (choice.indexOf("Another") > -1){
            location.reload();
        } else {
            storyHTML("pageStart");
            
        }
    } else{
        storyHTML(choice);
    }
    
}

