var config = {
  apiKey: "AIzaSyCVGbHah9ZOba-AuUk1KZxnlLmvjBjJtgk",
  authDomain: "forclass-4f95c.firebaseapp.com",
  databaseURL: "https://forclass-4f95c.firebaseio.com",
  projectId: "forclass-4f95c",
  storageBucket: "forclass-4f95c.appspot.com",
  messagingSenderId: "895419474223"
};

firebase.initializeApp(config);
// AIzaSyB3Kk7w3jpS9IjdxbcnVHSHcU GEO
// AIzaSyCA3B7MNAEv9ta8ZOXnteOlqLShIrdIKXE Script API

// GLOBAL VARIABLES
var lat;
var lng;
var location;

var database = firebase.database();


// ZOMATO RESTAURANT JSON DATA CARD
// TEMPLATE LITERAL CONTAINING RESTAURANT - NAME - IMAGE - MENU/URL - RATING == DISPLAYED AFTER ONCLICK
function foodResults(response) {
  return `
    <div class=theFood> 
    <img  class="foodPictures img-fluid"src="${
      response.restaurant.featured_image
    }" alt="restaurantPicture" >
    <h5 id="restName">${response.restaurant.name} </h5>
    <a href="${response.restaurant.menu_url}" target ="_blank">Menu Link  </a>
    <p>Rating &nbsp ${response.restaurant.user_rating.aggregate_rating} </p>
    </div>
    `;
}

var zomatoCityId;
$(document).on("click", "#submit", function() {
  // INPUT VALUES - CITY - STATE
  var city = $("#theCity").val().trim();
  var state = $("#theState").val().trim();
  // CLEARS INPUT - CITY - STATE
  $("#theCity").val("");
  $("#theState").val("");

  // CITY ID ZOMATO ================================================= 1ST CALL - ZOMATO - CITY - STATE
  $.ajax({
    url:
      "https://developers.zomato.com/api/v2.1/cities?q=" + city + "," + state,
    method: "GET",
    headers: {
      "user-key": "3373e99a07815c6329a67cf51dc7e958"
    }
  }).then(function(response) {
    // CITY ID FROM RESPONSE ============================== 1ST &THEN FUNCTION - ZOMATO - CITY - STATE 
    // CITY ID TURNED INTO STRING
    zomatoCityId = response.location_suggestions[0].id.toString();
    // SEARCH CALL ZOMATO ===================================================== 2ND CALL - ZOMATO
    // initMap(lat, lng, location);
    $.ajax({
      url:"https://developers.zomato.com/api/v2.1/search?count=5&entity_id=" + zomatoCityId + "&entity_type=city&sort=rating",
      method: "GET",
      headers: {
        "user-key": "3373e99a07815c6329a67cf51dc7e958"
      }
    }).then(function(response){
    // RESTAURANT RESULTS ZOMATO ============================================== 2ND &THEN FUNCTION - ZOMATO
    // JQUERY DISPLAYING FOOD RESULTS TO THE DOM
      $("#foodCards").html(response.restaurants.map(foodResults));
    // ZOMATO RESPONSE STORED AS ZOMATO DATA ================================== zomatoData = response;
      zomatoData = response;
      var location = response.restaurants[0].restaurant.location.address; // Zomato Address Data
    
    // GEOCODE CONVERTING RESTAURANT ADDRESS TO LATITIUDE & LONGITUDE ========= 3RD CALL - GOOGLE MAPS
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              address: location,
              key: "AIzaSyB3Kk7w3jpS9IjdxbcnVHSHcU-RS7PHMys"
            }
          })
          .then(function(response) {
            // ================================================================ 3RD &THEN FUNCTION - GOOGLE MAPS
            // Address - Latitude stored in a variable
            var lat = response.data.results[0].geometry.location.lat; 
            // Address - Longitude stored in a variable
            var lng = response.data.results[0].geometry.location.lng;   
            // John and Thomas are working on this function and call
            initMap2(lat, lng, location); 
          });

    
    });
  });
});
// FIRST MAP ================================================================== USERS LOCATION 
var map, infowindow;
function initMap() {
  var options =  {
    center: { lat: 30.2672, lng: 97.7431},
    zoom: 8,
    mapTypeId: 'hybrid'
  };
map = new google.maps.Map(document.getElementById('map'), options);
infowindow = new google.maps.InfoWindow;
  //  GEOCODE // ASKS USERS CONSENT FOR THEIR LOCATION
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (p){
    var position = {
      lat: p.coords.latitude,
      lng: p.coords.longitude 
    };
    infowindow.setPosition(position);
    infowindow.setContent('Your location!')
    infowindow.open(map);
  }, function () { 
      handleLocationError('Geolocation service failed', map.getCenter());
  })
} else {
    handleLocationError('No geolocation available', map.getCenter());
  }
}

function handleLocationError (content, position) {
  infowindow.setPosition(position);
  infowindow.setContent(content);
  infowindow.open(map);
}
// SECOND MAP ================================================================= 1ST ZOMATO RESTAURANT LOCATION
var map2, infowindow2;
function initMap2(lat, lng) {
  var options =  {
    center: { lat: lat, lng: lng},
    zoom: 16,
    mapTypeId: 'hybrid'
  };
map2 = new google.maps.Map(document.getElementById('map'), options);
infowindow = new google.maps.InfoWindow
}

// DOCUMENT READY // TWO OPTIONS 21+ HIDES BUTTONS // 21- REDIRECTS USERS TO CHUCK E' CHEESES' WEBSITE
$(document).ready(function(){
  $("#testLoad").hide();
  $("#testHide").hide();
  $("#mapResults").hide();
})

$("#btnOver21").click(function(){
  console.log("Over 21")  
 
//  HIDES <div id="agePopUp">
 $("#agePopUp").hide();
 $("#testLoad").show();
 $("#testHide").show();
 $("body").addClass("bg2");
});

$("#btnUnder21").click(function(){
  console.log("under 21")
  var go_to_url = "https://www.chuckecheese.com/";
// REDIRECTS USERS TO URL
  document.location.href = go_to_url;
});

$("#submit").click(function() {
  $("#testHide").hide();
  $("#mapResults").show();
});

