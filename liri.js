var request = require('request'),
	twitter = require('twitter'),
	spotify = require('spotify'),
  keys = require('./keys.js');

//console.log(keys.twitterKeys);

switch (process.argv[2]){
  case 'my-tweets':
    console.log("my tweets switch");
    var client = new twitter(keys.twitterKeys);
    var params = {screen_name: 'HotSpitNYFace'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        //var json = JSON.parse(tweets);
        console.log(tweets);
      }
    });

    break;
  case 'spotify-this-song':
    console.log("spotify switch");
    //spotify info
    spotify.search({ type: 'track', query:process.argv[3] }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data);
        // Do something with 'data' 
    });   
    break;
  case 'movie-this':
    console.log("movie switch");
    ///movie info
    request('http://www.omdbapi.com/?t=' + process.argv[3].trim() + '&y=&plot=short&r=json', function (error, response, body) {
     if (!error && response.statusCode == 200) {
       var json = JSON.parse(body);
       console.log("imbd rating: "+json.imdbRating) 
     }
    })
    break;
  case 'do-what-it-says':
    console.log("do what it says switch");
    break;
  default:
    console.log("Sorry. Command not recognized") ;
}


//twitter info

// console.log(keys.twitterKeys.consumer_key);



