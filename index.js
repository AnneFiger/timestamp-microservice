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

// A request to /api/1451001600000 should return { unix: 1451001600000, 
// utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

// app.get("/api/1451001600000", function (req, res) {
//   res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
// });

// This below needs to be modified to be actually what's returned for an 
// empty date parameter (separate function above this one?) - see what happens with an edge case ie request to 2015-02-31 -should return error
app.get("/api/:date?", function (req, res, next) {
  // date = new Date(req.params.date)
  unixtest = Date.parse(req.params.date)
  if (isNaN(unixtest)===false) { //if unixtest is valid meaning the date given in the request is a valid date
    date = new Date(req.params.date)
    dateAsUTCString = date.toUTCString()
    unix = date[Symbol.toPrimitive]('number')
  }else{
    unix = req.params.date;
    date = new Date(0);
    date.setUTCMilliseconds(unix);
    dateAsUTCString = date.toUTCString()
  }
  next();
}, function(req,res) {
  res.json({unix: unix, utc: dateAsUTCString}); 
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});

//another comment
