// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// A request to /api/1451001600000 should return { unix: 1451001600000, 
// utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
app.get("/api/1451001600000", function (req, res) {
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

// This below needs to be modified to be actually what's returned for an 
// empty date parameter + unix timestamp
app.get("/api/:date", function (req, res, next) {
  date = new Date(req.params.date).toString()
  next();
}, function(req,res) {
  res.json({"unix":1451001600000, "utc": date}); 
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});

//another comment
