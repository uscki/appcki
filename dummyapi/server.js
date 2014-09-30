var express = require('express');
var app = express();

app.get('/login', function(req, res){
  res.send(JSON.stringify({
  	success:true,
  	token: "88861d56dbe4b82f40cd00439b6d1542"
  }));
});


app.get('/agenda', function(req, res){
  res.send(JSON.stringify([
  	{
  		id: 1234,
  		title: "Dummy titel",
  		text: "fsadf sadf asdfasdf asdfasf asdfasdf asdfasdf",
  		commission: {
  			id: 1,
  			name: "Appcki"
  		},
  		location:{
  			name: "asdf ",
  			lat: 10.000,
  			lon: 20.000
  		},
  		charge: "Gratis",
  		when:{
  			start: 100000,
  			stop: 100100
  		},
  		category:{
  			id: 1,
  			title: "incognito"
  		}

  	},
  	{
  		id: 1234,
  		title: "Dummy titel",
  		text: "fsadf sadf asdfasdf asdfasf asdfasdf asdfasdf",
  		commission: {
  			id: 1,
  			name: "Appcki"
  		},
  		location:{
  			name: "asdf ",
  			lat: 10.000,
  			lon: 20.000
  		},
  		charge: undefined,
  		when:{
  			start: 100000,
  			stop: 100100
  		}
  		category:{
  			id: 1,
  			title: "AI"
  		}
  	},
  ]));
});

app.listen(4000);
