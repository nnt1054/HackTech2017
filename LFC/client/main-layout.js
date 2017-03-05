import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Events } from '../imports/api/events.js';

import './main.html';

Template.main_layout.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
  });


Template.main_layout.helpers({

test() {
  return 1;
},

EventLoop() {

  var artistId = "";
  var myEvents = []; // List of jsons
  var list = ["Adam Lambert", "Queen", "Metallica"];
  var counter = 0;
  const instance = Template.instance();


  // Whole pipeline
  var findEvents = function(artists) { // questionable syntax
  console.log("finding events");
  for (var i = 0; i < artists.length; i++) {
    getArtistId(artists[i]); // questionable call
  }

  //displayAll();
  };

// Attraction search (individual artist)
var getArtistId = function(name, query) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions.json?size=1&keyword=" + name + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) {
                artistId = json._embedded.attractions[0].id; // Save artist id
                findEvent(artistId); // questionable call
              },
    error: function(xhr, status, err) {
                // Print error message
            }
  });
};

// Find concerts of artist specified by artistId
var findEvent = function(artistId, query) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?includeTBA=no&attractionId=" + artistId + "&apikey=CMA0h8q4ZAphjzGLoVQAZ998gkBIhUUw",
    async:true,
    dataType: "json",
    success: function(json) { // Might be many events
    if (json._embedded != null) {
      myEvents = myEvents.concat(json._embedded.events);
      while (counter < myEvents.length) {
        instance.state.set(counter, myEvents[counter]);
        //Events.insert(myEvents[counter]);
        counter++;
      }
      //for (var i = 0; i < json._embedded.events.length && json._embedded.events.length > 0; i++) {
       // console.log(json._embedded.events[i].name);
      //}
    } else {
      console.log("null");
    }
            },
    error: function(xhr, status, err) {
                // Print error message
            }
  });
};

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
};


findEvents(list);
},

display_all() {
    const instance = Template.instance();
    var e = [];


    for (var i = 0; instance.state.get(i); i++) {
      var bool = false;
      for (var j = 0; j < e.length; j+= 1) {
        if (instance.state.get(i).id == (e[j]).id) {
          bool = true;
        }
      }
      if (!bool) {
        e.push(instance.state.get(i));
      }
    }

    e = e.sort(function(a, b) {
      x = a.dates.start.localDate.toLowerCase();
      y = b.dates.start.localDate.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      else return 0;
    });
    console.log(e);
    return e;
  },

});


Template.main_layout.events({

  'click .sdate'(event, instance2) {
    const instance = Template.instance();
    var e = [];

    for (var i = 0; instance.state.get(i); i++) {
      var bool = false;
      for (var j = 0; j < e.length; j+= 1) {
        if (instance.state.get(i).id == (e[j]).id) {
          bool = true;
        }
      }
      if (!bool) {
        e.push(instance.state.get(i));
      }
    }

    e = e.sort(function(a, b) {
      x = a.dates.start.localDate.toLowerCase();
      y = b.dates.start.localDate.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      else return 0;
    });
    var list = instance2.lastNode;
    $(list).html('<ul> </ul>');
    for (var i = 0; i < e.length; i++) {
      $(list).append(
        $('<li>').append(
        	$('<span>').attr('class','name').append( e[i].name).append(
          $('<span>').attr('class','event-date').append( e[i].dates.start.localDate).append(
          $('<span>').attr('class','location').append( e[i]._embedded.venues[0].city.name).append(
          $('<a>').attr('href', e[i].url).attr('class', "sidenav-list-item__link").append("More Details...").append(
          $('<input>').attr('type', 'checkbox').attr('checked', false)
          )))))
        )
    }
    console.log(list);

  },

  'click .sartist'(event, instance2) {
    const instance = Template.instance();
    var e = [];

    for (var i = 0; instance.state.get(i); i++) {
      var bool = false;
      for (var j = 0; j < e.length; j+= 1) {
        if (instance.state.get(i).id == (e[j]).id) {
          bool = true;
        }
      }
      if (!bool) {
        e.push(instance.state.get(i));
      }
    }

    e = e.sort(function(a, b) {
      x = a._embedded.attractions[0].name;
      y = b._embedded.attractions[0].name;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      else return 0;
    });
    var list = instance2.lastNode;
    $(list).html('<ul> </ul>');
    for (var i = 0; i < e.length; i++) {
      $(list).append(
        $('<li>').append(
        	$('<span>').attr('class','name').append( e[i].name).append(
          $('<span>').attr('class','event-date').append( e[i].dates.start.localDate).append(
          $('<span>').attr('class','location').append( e[i]._embedded.venues[0].city.name).append(
          $('<a>').attr('href', e[i].url).attr('class', "sidenav-list-item__link").append("More Details...").append(
          $('<input>').attr('type', 'checkbox').attr('checked', false)
          )))))
        )
    }
  },

  'click .slocate'(event, instance2) {
    const instance = Template.instance();
    var e = [];


    for (var i = 0; instance.state.get(i); i++) {
      var bool = false;
      for (var j = 0; j < e.length; j+= 1) {
        if (instance.state.get(i).id == (e[j]).id) {
          bool = true;
        }
      }
      if (!bool) {
        e.push(instance.state.get(i));
      }
    }

    e = e.sort(function(a, b) {
      x = a._embedded.venues[0].city.name;
      y = b._embedded.venues[0].city.name;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      else return 0;
    });
    var list = instance2.lastNode;
    $(list).html('<ul> </ul>');
    for (var i = 0; i < e.length; i++) {
      $(list).append(
        $('<li>').append(
        	$('<span>').attr('class','name').append( e[i].name).append(
          $('<span>').attr('class','event-date').append( e[i].dates.start.localDate).append(
          $('<span>').attr('class','location').append( e[i]._embedded.venues[0].city.name).append(
          $('<a>').attr('href', e[i].url).attr('class', "sidenav-list-item__link").append("More Details...").append(
          $('<input>').attr('type', 'checkbox').attr('checked', false)
          )))))
        )
    }
  },

  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Events.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },


});
