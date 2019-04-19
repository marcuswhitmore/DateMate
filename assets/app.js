//Firebase config data
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

// Function that will Log address to DOM
  function geoCode() {
        var location = '22 main st Boston MA'; // Eventually Zomato Address data
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
          params:{
            address:location,
            key:'AIzaSyB3Kk7w3jpS9IjdxbcnVHSHcU-RS7PHMys'
          }
        }).then(function(response){
          console.log(response);


          console.log(response.data.results[0].formatted_address);
        })
      }
  geoCode();

var zomatoCityId;
$(document).on("click", "#submit", function() {
  

  var city = $("#theCity").val().trim();
  var state = $("#theState").val().trim();
  $("#theCity").val("");
  $("#theState").val("");
  $.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=" + city + "," + state ,
    method: "GET",
    headers: {
      "user-key": "3373e99a07815c6329a67cf51dc7e958"
    }
  }).then(function(response) {
    console.log(response.location_suggestions[0].id);
    zomatoCityId = response.location_suggestions[0].id.toString();
    console.log(zomatoCityId)

    $.ajax({
      url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityId + "&entity_type=city&sort=rating",
      method: "GET",
      headers: {
        "user-key": "3373e99a07815c6329a67cf51dc7e958"
      }
    }).then(function(response) {
      console.log(response);
      console.log(response.restaurants[0].restaurant.name)  // Name of restaurant
      console.log(response.restaurants[0].restaurant.menu_url)  // menu link
      console.log(response.restaurants[0].restaurant.featured_image) //image url
      console.log(response.restaurants[0].restaurant.user_rating.aggregate_rating)    //zomato user rating
   
   
      zomatoData = response;
    });
  });

});

// Map displaying on DOM
var gApiKey = "AIzaSyCA3B7MNAEv9ta8ZOXnteOlqLShIrdIKXE";
var map;
function initMap() {
  var options = {
    zoom: 14,
    center: { lat: 30.2672, lng: -97.7431 },
    mapTypeId: 'hybrid'

  };



  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    position: { lat: 30.2672, lng: -97.7431 },
    map: map
  });
  
  var map = new google.maps.Map(document.getElementById("map"), options);
  

  var marker = new google.maps.Marker({
    position: { lat: 30.2672, lng: -97.7431 },
    map: map
  });
  infoWindow = new google.maps.InfoWindow;

// This statement is asking our user if they would allow us to use their location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
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

