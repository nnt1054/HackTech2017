import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import './main.html';
import '../imports/ui/templates.js';

var options = {
  showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
  requestPermissions: ['user-read-email'] // Spotify access scopes.
};

Meteor.loginWithSpotify(options, function(accessToken) {
  console.log("entered");
  console.log(accessToken)
});
