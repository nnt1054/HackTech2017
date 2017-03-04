//var $ = require('jquery'),
   // XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//$.support.cors = true;
//    return new XMLHttpRequest();
//var request = require('request');
var artistId = "";
var zipcode = "";
var myEvents = []; // List of jsons
var list = ["Drake", "Mako", "Justin Bieber"];


// Whole pipeline
var findAllEvents = function(artists, zipcode) { // questionable syntax
  console.log("finding events");

  $('#events-panel').show();
  $('#attraction-panel').hide();

  for (var i = 0; i < artists.length; i++) {
    getArtistId(artists[i]); // questionable call
  }
 console.log(myEvents.length);
  //displayAll();
}

// Attraction search (individual artist)
var getArtistId = function(name, query) {
  console.log(name);
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions.json?size=1&keyword=" + name + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) {
                artistId = json._embedded.attractions[0].id; // Save artist id
                console.log(artistId);
                console.log("entering find event")
                findEvent(artistId); // questionable call
              },
    error: function(xhr, status, err) {
                console.log(err);
            }
  });
}

// Find concerts of artist specified by artistId
var findEvent = function(artistId, query) {
  console.log(artistId);
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?includeTBD=no&includeTBA=no&radius=30&postalCode=" + zipcode + 
      "&attractionId=" + artistId + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) { // Might be many events
    if (json._embedded != null) {
      myEvents = myEvents.concat(json._embedded.events); 
      console.log(myEvents.length);
      //for (var i = 0; i < json._embedded.events.length && json._embedded.events.length > 0; i++) {
       // console.log(json._embedded.events[i].name); 
      //}
    } else {
      console.log("null");
    }   
  },
  error: function(xhr, status, err) {
      console.log(err);
  }
  });
}

// Display table of events
var displayAll = function() {
    myEvents.sort(function(a, b) { // Sort events by date
    var x = a.dates.start.localDate.toLowerCase();
    var y = b.dates.start.localDate.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1;}
    return 0;
  })

  var items = $('#events .list-group-item');
  items.hide();

  var item = items.first();
  for (var i = 0; i < myEvents.length; i++) {
    item.children('.list-group-item-heading').text(myEvents[i].name);
    item.children('.list-group-item-text').text(myEvents[i].dates.start.localDate);
    try {
      item.children('.venue').text(myEvents[i]._embedded.venues[0].name + " in " + 
        myEvents[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(myEvents[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item = item.next();
  }
}


console.log("lmao");
findEvents(list);


////////////////////////////////////////