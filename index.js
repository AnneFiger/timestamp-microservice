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



// 2015-02-31 won't return error
app.get("/api/:date?", function (req, res, next) {
  if(!req.params.date) {
    date = new Date()
    dateAsUTCString = date.toUTCString()
    unix = date[Symbol.toPrimitive]('number')
  }else{
    unixtest = Date.parse(req.params.date)
    if (isNaN(unixtest)===false) { //if unixtest is valid meaning the date given in the request is a valid date
      date = new Date(req.params.date) //Your project can handle dates that can be successfully parsed by new Date(date_string)?
      dateAsUTCString = date.toUTCString()
      unix = date[Symbol.toPrimitive]('number')
    }else{
      unix = req.params.date
      //need clause here to check actual valid date format and return error -this only weeds out
      //: ; characters etc that would make return an object with "null, invalid date"
      if(isNaN(unix)){
        return res.send({error : "Invalid Date"});
      }
      date = new Date(0);
      date.setUTCMilliseconds(unix);
      dateAsUTCString = date.toUTCString()
    }
  }
  next();
}, function(req,res) {
  res.json({unix: +unix, utc: dateAsUTCString}); //no space in between unix and utc. See at validation if a problem
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});

//another comment
