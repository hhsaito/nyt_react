// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYT API key
// var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear   = 0;

// Array to hold the various article info
var articleCounter = 0;

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(queryTerm, startYear, endYear) {

    console.log('Query term: ', queryTerm);

    // Figure out the geoqueryTerm
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + queryTerm;

    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (parseInt(startYear)) {
      queryURL = queryURL + "&begin_date=" + startYear + "0101";
      console.log('inside call: ', startYear);
    }

    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (parseInt(endYear)) {
      queryURL = queryURL + "&end_date=" + endYear + "0101";
      console.log('inside call: ', endYear);
    }

    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      console.log('Here\'s the response', response.data.response.docs);


      if (response.data.response.docs[0]) {
        return response.data.response.docs[0];
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postArticles: function(main_title, web_url, pub_date) {
    return axios.post("/api/saved", { title: main_title, url: web_url, date: pub_date });
  }
};

// We export the API helper
module.exports = helper;
