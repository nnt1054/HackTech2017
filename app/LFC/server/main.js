import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup


  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": "6066b678fbee4a60add8ece599ef8d5d",
        "secret": "c2b5f11271344fe2a5500b23fb993a05",
        "redirectUri" : 'https://lookingforconcert.herokuapp.com/_oauth/spotify?close'
      }
    },
    { upsert: true }
  );

  Meteor.methods({

    tester: function() {
      return "lmao";
    },

    getSavedTracksCount: function() {
      var spotifyApi = new SpotifyWebApi();
      var response = spotifyApi.getMySavedTracks({});
      if (checkTokenRefreshed(response, spotifyApi)) {
        response = spotifyApi.getMySavedTracks({});
      }
      return response.data.body.total;
    },

    getSavedTracks: function() {
      var artist
      var spotifyApi = new SpotifyWebApi();
      var response = spotifyApi.getMySavedTracks({});
      if (checkTokenRefreshed(response, spotifyApi)) {
        response = spotifyApi.getMySavedTracks({});
      }
      return response.data.body;
    },

    getAllArtists: function() {

      var totalSongs = 0;
      var offset = 0;
      var artists = [];

      var getCount = function(){
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getMySavedTracks({});
        if (checkTokenRefreshed(response, spotifyApi)) {
          response = spotifyApi.getMySavedTracks({});
        }
        return response.data.body.total;
      };
      totalSongs = getCount();

      var getArtistsAtOffset = function(x) {
        var artist
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getMySavedTracks({
          offset: x,
          limit: 50
        });
        if (checkTokenRefreshed(response, spotifyApi)) {
          response = spotifyApi.getMySavedTracks({
            offset: x,
            limit: 50
          });
        }
        for (var i = 0; i < response.data.body.items.length; i++) {
          artists.push(response.data.body.items[i].track.artists[0].name);
        }
      }

      for (offset = 0; offset < totalSongs; offset += 50) {
        getArtistsAtOffset(offset);
      }

      var x = new Set(artists);
      var y = []
      x.forEach(function(a) {
        y.push(a);
      })
      return y;

    }

  }); //end of meteor methods

  var checkTokenRefreshed = function(response, api) {
    if (response.error && response.error.statusCode === 401) {
      api.refreshAndUpdateAccessToken();
      return true;
    } else {
      return false;
    }
  }

})
