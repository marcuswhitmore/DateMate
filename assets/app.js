
var config = {
    apiKey: "AIzaSyCVGbHah9ZOba-AuUk1KZxnlLmvjBjJtgk",
    authDomain: "forclass-4f95c.firebaseapp.com",
    databaseURL: "https://forclass-4f95c.firebaseio.com",
    projectId: "forclass-4f95c",
    storageBucket: "forclass-4f95c.appspot.com",
    messagingSenderId: "895419474223"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database.
  var database = firebase.database();

$.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=austin",
    method: "GET",
    headers: {
   "user-key": "3373e99a07815c6329a67cf51dc7e958"
     },
  }).then(function(response) {
    console.log(response);
    
    

  });

