require('dotenv').config()
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var channelName = '';
api = process.env.API;
database = process.env.DATABASE;

mongoose.Promise = global.Promise;
mongoose.connect(database, { useMongoClient: true });

// Mongoose user schema
var userName = mongoose.model('userName', { name: String });


app = express();
app.set('view engine', 'ejs');

function queryMaker(channel, api){
  return 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+channel+'&key=' + api;
}

request(queryMaker(channelName, api), function (error, response, body) {
  if(!error && response.statusCode == 200){
    var parsedBody = JSON.parse(body);
    // console.log(parsedBody.items[0].statistics)
  }
});

// var user = new userName({ name: 'RockAlone2k' });
// user.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });


app.get('/', function(req, res){
  res.render('index')
})

app.get('/list', function(req, res){
  userName.find({}, function(err, usernames){
    if(err){
      console.log('Database error');
    } else {
      res.render('list', {users: usernames});
      // console.log(usernames)
    }
  })
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running ' + port);

