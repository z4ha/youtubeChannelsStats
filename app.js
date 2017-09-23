require('dotenv').config()
var express = require('express');
var request = require('request');
var channelName = '';
api = process.env.API;
database = process.env.DATABASE;

app = express();

function queryMaker(channel, api){
  return 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+channel+'&key=' + api;
}

request(queryMaker(channelName, api), function (error, response, body) {
  if(!error && response.statusCode == 200){
    var parsedBody = JSON.parse(body);
    console.log(parsedBody.items[0].statistics)
  }
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running ' + port);
