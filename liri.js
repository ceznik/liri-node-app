var request = require('request');
var	Twitter = require('twitter');
var	Spotify = require('spotify');
var keys = require('./keys.js');
var fs = require('fs');


switch (process.argv[2]){
  case 'my-tweets':
    tweets();
    break;
  case 'spotify-this-song':
    spotify(process.argv[3]);
    break;
  case 'movie-this':
    movie(process.argv[3]);
    break;
  case 'do-what-it-says':
    console.log("do what it says switch");
    fs.readFile('./random.txt', 'utf-8', function(err, data){
      data = data.split(',');
      switch (data[0]){
        case 'my-tweets':
          tweets();
          break;
        case 'spotify-this-song':
          spotify(data[1]);
          break;
        case 'movie-this':
          movie(data[1]);
          break;
        default:
          console.log("Sorry. Problem reading file");
      }
      console.log(data[1]);
    });
    break;
  default:
    console.log("Sorry. Command not recognized") ;
}

function tweets(){
  console.log("my tweets switch");
  var client = new Twitter(keys.twitterKeys);
  var params = {screen_name: 'HotSpitNYFace'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      //var json = JSON.parse(tweets);
      for (i=0; i<tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log('-----------------');
      }

      //console.log(tweets);
    }else{
      console.log('Error getting tweets: ' + error);
    }
  });
}

function spotify(songName){
  console.log("spotify switch");
  //spotify info
  var querySong;
  if (process.argv[3] != '' && process.argv[3]!= null){
    querySong = songName;
  }else{
    querySong = 'what\'s my age again';
  }
  Spotify.search({ type: 'track', query: querySong }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
      var songResults = data.tracks.items;
      console.log(songResults);
      // Do something with 'data'
      for (var i = 0; i < songResults.length; i++){
        console.log(i+1);
        console.log('artist(s): ' + songResults[i].artists[0].name);
        console.log('song name: ' + songResults[i].name);
        console.log('preview song: ' + songResults[i].preview_url);
        console.log('album: ' + songResults[i].album.name);
        console.log('-----------------------------------');
      }
  });
}

function movie(movieName){
  console.log("movie switch");
  ///movie info
  var movieString;
  if (process.argv[3] != '' && process.argv[3] != null){ //check if a title is specified
    movieString = process.argv[3].trim();
  }else{
    movieString = 'Mr.+Nobody'; //use 'Mr. Nobody' if no title is specified
  }
  request('http://www.omdbapi.com/?t=' + movieString + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var json = JSON.parse(body);
     console.log("Title: "+ json.Title);
     console.log("Year: " + json.Year);
     console.log("IMDB Rating: " + json.imdbRating);
     console.log("Country: " + json.Country);
     console.log("Language: " + json.Language);
     console.log("Plot: " + json.Plot);
     console.log("Actors: " + json.Actors);
     console.log("Rotten Tomatoes Rating: " + json.tomatoRating);
     console.log("Rotten Tomatoes URL: " + json.tomatoURL);
   }
 });
}


//twitter info

// console.log(keys.twitterKeys.consumer_key);
