// server.js
// where your node app starts
 const moment= require('moment');
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:time", function (req, res) {
  const time = req.params.time;
    
  if(!isNaN(time)){
    res.json({
      unix:new Date(time).getTime(),
      utc: new Date(time).toUTCString()
    })
  }else{
    if(moment(time, 'MMM DD YYYY').isValid()){
      res.json({
        unix: new Date(time).getTime(),
        utc: new Date(time).toUTCString()
    })
    }else{
      return {eror: 'Invalid Date'}
    }
  }
}
);
app.get('/api/timestamp', function(req, res){
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
