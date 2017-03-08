import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup


  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": "8b558b1537a0440097cff293df53198b",
        "secret": "e278c9f2f40949248f410cef319a9b4f",
        "redirectUri" : 'https://localhost:3000/callback'
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
