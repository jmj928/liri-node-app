require("dotenv").config();

var request = require("request");

var getKeys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

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

switch (action) {
    case "my-tweets":
      
      break;
    
    case "spotify-this-song":
     
      break;
    
    case "movie-this":
      getMovieData();
      break;
    
    case "do-what-it-says":
      
      break;
    default :
    conosole.log("Sorry that's not a valid command. Please make sure you entered correct. Valid commands are my-tweets, spotify-this-song, movie-this, and do-what-it-says");
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