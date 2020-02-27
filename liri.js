var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");



var action = process.argv[2];
var request = process.argv.slice(3).join(" ");

console.log(action);
console.log(request);


// application functions

function findConcert(request) {
    // use axios to search for requested concert using bands in town api
    // data should allow for name of venue, venue location and pretty date of event

    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(function (response) {
        // if concert data is found print the data the screen
        console.log("===CONCERT INFORMATION===\n");
        // console.log(response);
        console.log("VENUE: " + response.data[0].venue.name + "\nLOCATION: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\nDATE: " + moment(response.data[0].datetime).format('MMM Do YYYY'));
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("=====DATA=====");
            console.log(error.response.data);
            console.log("=====STATUS=====");
            console.log(error.response.status);
            console.log("=====HEADERS STATUS=====")
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}




function findMovie(request) {
    // use axios to search for requested concert using bands in town api
    // data should allow for name of venue, venue location and pretty date of event

    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + request).then(function (response) {
        // if concert data is found print the data the screen
        console.log("===MOVIE INFORMATION===\n");
        // console.log(response);
        console.log("TITLE: " + response.Title + "\nRELEASE YEAR: " + response.Year + "\nIMDB RATING: " + response.Ratings[0].Value + "\nROTTEN TOMATOES RATING: " + response.Ratings[1].value + "\nCOUNTRY: " + response.Country + "\nLANGUAGE: " + response.Language + "\nPLOT: " + response.Plot + "\nACTORS: " + response.Actors);
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("=====DATA=====");
            console.log(error.response.data);
            console.log("=====STATUS=====");
            console.log(error.response.status);
            console.log("=====HEADERS STATUS=====")
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function findSong(request) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: request
    }).then(function(data){
        if (request === "") {
            request = "The Sign";
            console.log("===SONG INFORMATION===\n");
            // console.log(data);
        } else {
            // console.log(data.tracks.items);
            for(i=0; i<data.tracks.items.length; i++){
                console.log("Match " + i +":\nArtist: " + data.tracks.items[i].artists[0].name + "\nSong: " + data.tracks.items[i].name +"\nAlbum: " + data.tracks.items[i].album.name + "\n Preview: " + data.tracks.items[i].preview_url);
            }

        }
    }).catch(function (error) {
        if (error.response) {
            //         // The request was made and the server responded with a status code
            //         // that falls out of the range of 2xx
            console.log("=====DATA=====");
            console.log(error.response.data);
            console.log("=====STATUS=====");
            console.log(error.response.status);
            console.log("=====HEADERS STATUS=====")
            console.log(error.response.headers);
        } else if (error.request) {
            //         // The request was made but no response was received
            //         // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            //         // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

console.log(action);
console.log(typeof (action));

switch (action) {
    case "concert-this":
        findConcert(request);

        break;
    case "spotify-this-song":
        findSong(request)
        break;
    case "movie-this":
        findMovie(request)
        break;
    case "do-what-it-says":
        // do code here
        break;
    default:
        console.log("Please enter a valid option.");
        break;
}