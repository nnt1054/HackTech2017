import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

 
import './upcoming.html';
import './concert.js';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({

  list_concerts() {
    const instance = Template.instance();
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { Date: -1 } });
  },

});

Template.body.events({

  'change .save-event input'(event, instance) {
    instance.state.set('saved', event.target.checked);
    //add event to saved concerts table
  },


})