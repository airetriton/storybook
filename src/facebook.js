$(document).ready(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1517689598316225';
          fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
// <!--Facebook link-->
      window.fbAsyncInit = function() {
         FB.init({
       appId            : '1994680544133095',
       autoLogAppEvents : true,
       xfbml            : true,
       version          : 'v2.11'
     })
   }