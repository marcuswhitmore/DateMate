$.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=austin",
    method: "GET",
    headers: {
   "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
     },
  }).then(function(response) {
    console.log(response);
    
    

  });
