var selectedStory;
var selectedChoice;
var currentStory = 0;
var currentPage = "pageStart";
var newSound = stories[0].pageStart.sound;

// FIREBASE GITHUB AUTHENTICATION
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

$(document).ready(function() {
    
	mainHTML();

    $(".story").on("click", function(event){
    selectedStory = $(this).text();

		var newStoryIndex =  $(".story").index(this);
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

    // $("#facebook").on("click", function(){
    //     checkLoginState();
    //   })
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

$(document).on("click", ".choice, .story-title", function() {
  var sound = $(this).attr("data-sound");
  var queryURL = "https://freesound.org/apiv2/search/text/?query="+newSound+"&filter=type:mp3&sort=duration_asc&token=0dLPbWt3qJbyxXWL3lfGKUHW575Bv5ThsCxITVEW";
          
          var queryURL2 = "https://freesound.org/apiv2/sounds/51715/"; 

              $.ajax({
                  url: queryURL,
                  method: "GET"
                })
                .done(function(response) {
                  var results = response.data;
                });

              $.ajax({
                  url: queryURL2,
                  method: "GET",
                  headers: {"Authorization": "Token JkKEUZNbmrCvQMQGlaW9OaKdash40HKv1a4Tl5Cm"}
                  })
                  .done(function(response) {
                    var results = response.previews;
                    //create audio element and assign it to a variable
                    var storySound = document.createElement("Audio");
                    //attribute the sound file
                    storySound.setAttribute("src", results["preview-hq-mp3"]);
                    storySound.load();
                    storySound.play();
                  });
              

});

function storyHTML(currentPage) {
  
var newGif = stories[currentStory][currentPage].topic;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGif + "&rating=g&api_key=NfjGwXVTVCgEGMawDPEr5a6iJRkDaNTJ&limit=1"

  $.ajax({
      url: queryURL,
      method: "GET"
  })
  .done(function(response) {
    var results = response.data;
    var storyImage = $("<img>");
    storyImage.addClass("gif");
    storyImage.attr("data-state", "still");
    storyImage.attr("src", results[0].images.fixed_width.url);
    storyText.prepend(storyImage);
  });

var storyHTML = "<h1>" + stories[currentStory].storyTitle + "</h1>";
  $(".main-area").html(storyHTML);
  var storyDiv = $("<div>");
  storyDiv.attr("id", "story-div");
  var storyText = $("<p>");
  storyText.addClass("text");
  storyText.text(stories[currentStory][currentPage].text);
  storyDiv.append(storyText);
  $(".main-area").append(storyDiv);
      $.each(stories[currentStory][currentPage].nextPage, function(k, v) {
          //display the key and value pair
          var choiceBtn = $("<button>");
          choiceBtn.addClass("text-center btn btn-default btn-lg choice");
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

function choiceUpdate(choice) {
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

