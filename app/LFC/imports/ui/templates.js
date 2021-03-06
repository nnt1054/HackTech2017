
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Events } from '../api/events.js'
import './templates.html';
import '../../client/main.html';

import '../../client/main-layout.js'

Template.upcoming.helpers({
  show_upcoming() {
    return Events.find({}, { sort: { Date: -1 } });
  },
});

Template.body.events({

  'change .save-event input'(event, instance) {
    instance.state.set('saved', event.target.checked);
    //add event to saved concerts table
  },
});
