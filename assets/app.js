$.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=austin",
    method: "GET",
    headers: {
   "user-key": "3373e99a07815c6329a67cf51dc7e958"
     },
  }).then(function(response) {
    console.log(response);
    
    

  });
