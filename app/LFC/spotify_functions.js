var totalSongs = 0;
var artists = [];

var getTotal = function(token) {
    console.log("inside gettotal html. ");

    $.ajax({
        url: 'https://api.spotify.com/v1/me/tracks/',
        async: true,
        headers: {
             'Authorization': 'Bearer ' + token
        },
        success: function(response) {
              totalSongs = response.total;
              console.log("success html")
        }
    });

};
var fetchAll = function(token) {
    console.log("inside fetchall ");
    var limit = 50;
    for (offset = 0; offset < totalSongs; offset += 50) {
        var i = totalSongs - offset;
        console.log(i);

        if (i < limit) {
          fetchSongs(offset, i, token);
        } else {
          fetchSongs(offset, limit, token);
        }
      }
    console.log(artists.length)
  };

var fetchSongs = function(offset, limit, token, query) {
    console.log("inside fetchsongs html");
    $.ajax({
        url: 'https://api.spotify.com/v1/me/tracks?limit=' + limit + '&offset=' + offset,
        async: true,
        headers: {
             'Authorization': 'Bearer ' + token
        },
        data: {
            q: query,
            type: 'track'
        },
        success: function(response) {
          for (var j = 0; j < response.length; j++) {
            artists.push(response.artists[j][0]);
          }
        }
    })


};
