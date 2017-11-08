var selectedStory;
var selectedChoice;
var currentStory = 0;
var currentPage = "pageStart";

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


        //FACEBOOK AUTHENTICATION
        function statusChangeCallback(response) {
         console.log('statusChangeCallback');
         console.log(response);
         if (response.status === 'connected') {
           testAPI();
         } else {
           document.getElementById('status').innerHTML = 'Please log ' +
             'into this app.';
         }
       }

       
          function checkLoginState() {
         FB.getLoginStatus(function(response) {
           statusChangeCallback(response);
         });
       }
       

       window.fbAsyncInit = function() {
       FB.init({
         appId      : '1994680544133095',
         cookie     : true,  // enable cookies to allow the server to access
                             // the session
         xfbml      : true,  // parse social plugins on this page
         version    : 'v2.8' // use graph api version 2.8
       });

       // Now that we've initialized the JavaScript SDK, we call
       // FB.getLoginStatus().  This function gets the state of the
       // person visiting this page and can return one of three states to
       // the callback you provide.  They can be:
       //
       // 1. Logged into your app ('connected')
       // 2. Logged into Facebook, but not your app ('not_authorized')
       // 3. Not logged into Facebook and can't tell if they are logged into
       //    your app or not.
       //
       // These three cases are handled in the callback function.

       FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
       });

       };

       // Load the SDK asynchronously
       (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

       // Here we run a very simple test of the Graph API after login is
       // successful.  See statusChangeCallback() for when this call is made.
       function testAPI() {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Successful login for: ' + response.name);
           document.getElementById('status').innerHTML =
             'Thanks for logging in, ' + response.name + '!';
         });
       }


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
    }, 3000);
		

    });

    $("#github").on("click", function(){
        githubSignin();
      })

    // $("#facebook").on("login", function(){
    //     checkLoginState()
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


function storyHTML(currentPage) {


	var storyHTML = "<h1>" + stories[currentStory].storyTitle + "</h1>";
    $(".main-area").html(storyHTML);
    var storyDiv = $("<div>");
    storyDiv.attr("id", "story-div");
    var storyImg = $("<img>");
    storyImg.addClass("img-story");
    storyImg.attr("src", "https://via.placeholder.com/350x350");
    storyDiv.append(storyImg);
    var storyText = $("<p>");
    storyText.addClass("text");
    storyText.text(stories[currentStory][currentPage].text);
    storyDiv.append(storyText);
    $(".main-area").append(storyDiv);
        $.each(stories[currentStory][currentPage].nextPage, function(k, v) {
            //display the key and value pair
            var choiceBtn = $("<button>");
            choiceBtn.addClass("text-center btn btn-warning btn-lg choice");
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
            }, 3000);
                
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

