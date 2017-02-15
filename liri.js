var fs = require("fs");

userInput1 = process.argv[2];
userInput2 = process.argv[3];

var logger = function(input) {
  console.log(input);
  fs.appendFile("log.txt", input + "\n", function(err) {
    });
};

//Twitter Query 1
var twitter = require('twitter');
var client = new twitter (require("./keys.js").twitterKeys);
var params = {user_id: '760864912889483265', count: '20', include_rts: '1'};

var twitterQueryUser = function() {
  client.get('statuses/user_timeline', params, function(err, tweets) {
    if ( err ) {
        logger('Error occurred: ' + err);
        return;
    }

    logger("");
    logger("Tweets for @elwn_ransom")
    for (var key in tweets) {
      logger(tweets[key].created_at);
      logger(tweets[key].text);    
      logger("");
    }
  });
};

//Twitter Query 2
var twitterQuery = function() {


      client.get('search/tweets', {q: userInput2}, function(error, tweets, response) {
        for (var key in tweets.statuses) {
          logger("");
          logger("@" + tweets.statuses[key].user.screen_name);
          logger(tweets.statuses[key].created_at);
          logger(tweets.statuses[key].text);
        }
      });

};

//Spotify Query
var spotify = require('spotify');
var spotifySong = userInput2;
 
var spotifyQuery = function() {


    spotify.search({ type: 'track', query: spotifySong}, function(err, data) {
        if ( err ) {
            logger('Error occurred: ' + err);
            return;
        }


        if (data.tracks.items[0] === undefined) {
          var spotifySong = "3DYVWvPh3kGwPasp7yjahc";
          spotify.lookup({ type: 'track', id: spotifySong }, function(err, data) {
            if ( err ) {
              logger('Error occurred: ' + err);
              return;
            }
            logger("I don't quite understand your query. You problem meant this:")
            logger("");
            logger(data.artists[0].name);
            logger(data.name);
            logger(data.preview_url);
            logger(data.album.name);
          });

        } else {

        logger("");
        logger(data.tracks.items[0].artists[0].name);
        logger(data.tracks.items[0].name);
        logger(data.tracks.items[0].preview_url);
        logger(data.tracks.items[0].album.name);
        } 
    });

};

//Movie Query
var movieQuery = function() {

    var request = require("request");
    var movie = userInput2;
    request(`https://api.themoviedb.org/3/search/movie?api_key=65df1022a70a9ad63fbfa028ad61d139&language=en-US&query=${userInput2}&page=1&include_adult=false`, function(err, response) {
       if ( err ) {
                logger('Error occurred: ' + err);
                return;
              }

        var movieObj = JSON.parse(response.body);
        if (movieObj.total_results === 0) {
          var movie = "Mr. Nobody";
          request(`https://api.themoviedb.org/3/search/movie?api_key=65df1022a70a9ad63fbfa028ad61d139&language=en-US&query=${movie}&page=1&include_adult=false`, function(err, response) {
            if ( err ) {
                logger('Error occurred: ' + err);
                return;
              }
            var movieObj = JSON.parse(response.body);
            logger("");
            logger("You obviously meant to this movie:");
            logger("");
            logger(movieObj.results[0].title);
            logger(movieObj.results[0].release_date);
            logger(movieObj.results[0].original_language);
            logger(movieObj.results[0].overview);
          });
        } else {
            logger("");
            logger(movieObj.results[0].title);
            logger(movieObj.results[0].release_date);
            logger(movieObj.results[0].original_language);
            logger(movieObj.results[0].overview);
          }
    });
};

//Do What it Says
var doItQuery = function() {
  fs.readFile("random.txt", "utf8", function(err, response) {
    var doItArr = response.split(", ");
    var command1 = doItArr[0];
    var command2 = doItArr[1];


  var exec = require('child_process').exec;
  var cmd = `node liri.js ${command1} ${command2}`;
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
  });
    
  });
}




switch(userInput1) {
case "my-tweets":
  twitterQueryUser();
  break;
case "search-tweets":
  twitterQuery();
  break;
case "spotify-this-song":
  spotifyQuery();
  break;
case "movie-this":
  movieQuery();
  break;
case "do-what-it-says":
  doItQuery();
  break;
default:
  logger("Invalid Command!");
}





