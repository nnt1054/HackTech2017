var $;
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    $ = require("jquery")(window);
});

var $ = require('jquery'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

$.support.cors = true;
$.ajaxSettings.xhr = function() {
    return new XMLHttpRequest();
};
var request = require('request');
var artistId = "";
var myEvents = []; // List of jsons
var list = ["Drake", "Neil", "Justin Bieber"];


// Whole pipeline
var findEvents = function(artists) { // questionable syntax
  console.log("finding events")
  for (var i = 0; i < artists.length; i++) {
    getArtistId(artists[i]); // questionable call
  }
  displayAll();
}

// Attraction search (individual artist)
var getArtistId = function(name, query) {
  console.log("gettingartistid")
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2attractions.json?size=1&keyword=" + name + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                artistId = json._embedded.attractions[0].id; // Save artist id
                findEvent(artistId); // questionable call
              },
    error: function(xhr, status, err) {
                // Print error message
            }
  });
}

// Find concerts of artist specified by artistId
var findEvent = function(artistId, query) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?radius=30&attractionId" + artistId + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) { // Might be many events
                console.log(json);
                myEvents.concat(json._embedded.events);
            },
    error: function(xhr, status, err) {
                // Print error message
            }
  });
}

// Display table of events
var displayAll = function() {
  var items = $('#events .list-group-item');
  items.hide();
  var item = items.first();
  for (var i = 0; i < myEvents.length; i++) {
    item.children('.list-group-item-heading').text(myEvents[i].name);
    item.children('.list-group-item-text').text(myEvents[i].dates.start.localDate);
    try {
      item.children('.venue').text(myEvents[i]._embedded.venues[0].name + " in " + myEvents[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
  }
}


console.log("lmao");
findEvents(list);