require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var spotifyAPI = require("node-spotify-api");
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});


var action = process.argv[4];
var request = process.argv[5];



// application functions

function findConcert(request) {
    // use axios to search for requested concert using bands in town api
    // data should allow for name of venue, venue location and pretty date of event

    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(function (response) {
        // if concert data is found print the data the screen
        console.log("===CONCERT INFORMATION===\n");
        console.log(response);
        console.log("VENUE: " + response.venue.name + "\nLOCATION: " + response.venue.city + ", " + response.venue.country + "\nDATE: " + moment(response.datetime).format('MMM Do YYYY'));
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




// function findMovie(request) {
//     // use axios to search for requested concert using bands in town api
//     // data should allow for name of venue, venue location and pretty date of event

//     axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + request).then(function (response) {
//         // if concert data is found print the data the screen
//         console.log("===MOVIE INFORMATION===\n");
//         console.log(response);
//         console.log("TITLE: " + response.Title + "\nRELEASE YEAR: " + response.Year + "\nIMDB RATING: " + movie rating here + "\nROTTEN TOMATOES RATING: " + movie rating here + "\nCOUNTRY: " + response.Country + "\nLANGUAGE: " + response.Language + "\nPLOT: " + response.Plot + "\nACTORS: " + response.Actors);
//     }).catch(function (error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log("=====DATA=====");
//             console.log(error.response.data);
//             console.log("=====STATUS=====");
//             console.log(error.response.status);
//             console.log("=====HEADERS STATUS=====")
//             console.log(error.response.headers);
//         } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//         }
//         console.log(error.config);
//     });
// }

function findSong(request) {
    spotify.search({
        type: 'track',
        query: request
    }, function (error, data) {
        if (request === "") {
            request = "The Sign";
            console.log("===SONG INFORMATION===\n");
            console.log(data);
        } else {
            console.log(data);

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