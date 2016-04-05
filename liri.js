var request = require('request'),
	twitter = require('twitter'),
	spotify = require('spotify');


//twitter info
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

//spotify info
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});

///movie info

request('http://www.omdbapi.com/?t=the+notebook&y=&plot=short&r=json', function (error, response, body) {
 if (!error && response.statusCode == 200) {
   var json = JSON.parse(boy);
   console.log("imbd rating: "+json.imdbRating) 
 }
})