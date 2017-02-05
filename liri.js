userInput1 = process.argv[2];
userInput2 = process.argv[3];

//Twitter Query
var twitter = require('twitter');
var client = new twitter (require("./keys.js").twitterKeys);
var params = {user_id: '760864912889483265', count: '20', include_rts: '1'};

var twitterQuery = function() {
  client.get('statuses/user_timeline', params, function(err, tweets) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log("Tweets for @elwn_ransom")
    for (var key in tweets) {
      console.log(tweets[key].created_at);
      console.log(tweets[key].text);    
      console.log("============================================================");
    }
  });
};

//Spotify Query
var spotify = require('spotify');
var spotifySong = userInput2;
 
var spotifyQuery = function() {
  spotify.search({ type: 'track', query: spotifySong }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;

      }

      if (data.tracks.items[0] === undefined) {
        var spotifySong = "The Sign";
        spotify.search({ type: 'album', query: spotifySong, artist: '5ksRONqssB7BR161NTtJAm' }, function(err, data) {
          if ( err ) {
            console.log('Error occurred: ' + err);
            return;
          }
          console.log(data.tracks.items[0].artists[0].name);
          console.log(data.tracks.items[0].name);
          console.log(data.tracks.items[0].preview_url);
          console.log(data.tracks.items[0].album.name);

        });

      } else {

      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].preview_url);
      console.log(data.tracks.items[0].album.name);
      } 

  });
}




switch(userInput1) {
  case "my-tweets":
    twitterQuery();
    break;
  case "spotify-this-song":
    spotifyQuery();
    break;
  case "movie-this":
    twitterQuery();
    break;
  case "do-what-it-says":
    twitterQuery();
    break;
  default:
    console.log("Invalid Command!");
}