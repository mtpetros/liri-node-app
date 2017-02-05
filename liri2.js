// var Twitter = require('twitter');
// var client = new Twitter (require("./keys.js").twitterKeys);
// var params = {user_id: '760864912889483265', count: '20', include_rts: '1'};
// console.log(client);


var liriCommands = {
        twitterNode: {
            Twitter: require('twitter'),
            clientAuth: require('./keys.js').twitterKeys,//new this.Twitter (require("./keys.js").twitterKeys),
            user: Object.assign({}, this.clientAuth, this.Twitter),
            params: {user_id: '760864912889483265', count: '20', include_rts: '1'},
            query: function() {
                this.user.get('statuses/user_timeline', this.params, function(error, tweets) {
                  if(error) throw error;
                  // console.log(tweets);  // The favorites. 
                  // console.log("========================================================");
                  console.log("Tweets for @elwn_ransom")
                  for (var key in tweets) {
                    console.log(tweets[key].created_at);
                    console.log(tweets[key].text);    
                    console.log("============================================================");
                  }
                });
            }
        }

};
//console.log(liriCommands);

//liriCommands.twitterNode.query();