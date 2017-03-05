import { Meteor } from 'meteor/meteor';
import '../imports/api/events.js';

Meteor.startup(() => {
  // code to run on server at startup
  console.log("startup");
  const client_id = '6066b678fbee4a60add8ece599ef8d5d';
  const client_secret = 'c2b5f11271344fe2a5500b23fb993a05'
  ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      clientId: '6066b678fbee4a60add8ece599ef8d5d',
      secret: 'c2b5f11271344fe2a5500b23fb993a05',
      redirecturi: 'http://localhost:3000/_oauth/spotify'
    }
  },
  { upsert: true });
});

Meteor.publish("getUserData", function () {
    return Meteor.users.find({_id: this.userId});
});