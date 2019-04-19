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


var zomatoData;
$(document).on("click", "#submit", function() {
  var city = $("#theCity").val().trim();
  $("#theCity").val("");
  $.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=" + city,
    method: "GET",
    headers: {
      "user-key": "3373e99a07815c6329a67cf51dc7e958"
    }
  }).then(function(response) {
    console.log(response);
    zomatoData = response;
  });
});
// this may be helpful for adding the map
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
// function initMap() {
//   // The location of Uluru
//   var uluru = {lat: -25.344, lng: 131.036};
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: uluru});
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: uluru, map: map});
// }

// google maps embeded api key
// AIzaSyCHk5Xc_Ch01g0I6Bhn6R5bj0TMpYhHGRI

// google maps javascript api key
// AIzaSyCHk5Xc_Ch01g0I6Bhn6R5bj0TMpYhHGRI

// Map displaying on DOM
var gApiKey = "AIzaSyCA3B7MNAEv9ta8ZOXnteOlqLShIrdIKXE";
var map;
function initMap() {
  var options = {
    zoom: 8,
    center: { lat: 30.2672, lng: -97.7431 }
  };

  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    position: { lat: 30.2672, lng: -97.7431 },
    map: map
  });
};

// var $newdiv1 = $( "<div id='object1'></div>" ),
  
// when user clicks button with age, page loads html that matches choice, two paths, one for 21 up and one for 20 below
$("#btnOver21").click(function(){
  console.log("Over 21")  
 // $( "body" ).append( $newdiv1);
});

$("#btnUnder21").click(function(){
  console.log("under 21")

});

