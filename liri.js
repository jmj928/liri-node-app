require("dotenv").config();

var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var nodeArgs = process.argv;
var value = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
  
        value = value + "+" + nodeArgs[i];
  
    }
  
    else {
  
        value += nodeArgs[i];
  
    }
  }
getAction();

function getAction(){
    switch (action) {
        case "my-tweets":
        getTweets();
        break;
        
        case "spotify-this-song":
        getSongData();
        break;
        
        case "movie-this":
        getMovieData();
        break;
        
        case "do-what-it-says":
        getText();
        break;
        default :
        conosole.log("Sorry that's not a valid command. Please make sure you entered correct. Valid commands are my-tweets, spotify-this-song, movie-this, and do-what-it-says");
        }
    }

    function getMovieData (){
        if(value === ""){
            value = "Mr. Nobody";
        }

        request("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=96837c43", function(error, response, body) {

        
            if (!error && response.statusCode === 200) {
            
                console.log("The title is: " + JSON.parse(body).Title + "\nThe year the movie came out is: " + JSON.parse(body).Year 
                + "\nThe IMDB Rating is: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value 
                + "\nCountry of production: " + JSON.parse(body).Country + "\nLanguage of movie: " + JSON.parse(body).Language
                + "\nPlot: " + JSON.parse(body).Plot + "\nActors in movie: " + JSON.parse(body).Actors);
            }
            else
            {
                console.log("Sorry there was an error retrieving that movie. Please try a different one!");
            }
            });


    }

    function getTweets (){
        client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?&count=20&screen_name=@creepypastacom", function(error, tweets, response){
            if(error) throw error;

            console.log("List of top 20 tweets");
            for(var i =0; i < 20; i++){
        
                console.log("\n" + (i + 1) + ": Created on " + tweets[i].created_at + "\nTweet: " + tweets[i].text );
             }
            
          });


    }

    function getSongData (){
        if(value === ""){
            value = "The Sign";
        }


        spotify.request( "https://api.spotify.com/v1/search?type=track&offset=0&limit=5&query=" + value )
        .then(function(response) {
           
                console.log("Artist: " + response.tracks.items[0].album.artists[0].name);  
                console.log("Song Name: " + response.tracks.items[0].name);  
                console.log("Preview: " + response.tracks.items[0].preview_url);  
                console.log("Album: " + response.tracks.items[0].album.name);
            
        })
        .catch(function(err) {
          console.log(err);
        });

    }

    function getText(){
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            }
          
            //console.log(data);
          
            var dataArr = data.split(",");
          
            //console.log(dataArr[0]);
            //console.log(dataArr[1]);
            action = dataArr[0];
            value = dataArr[1];
            getAction();
          
          });
        
    }