import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  // do all the cool shit that looks for upcoming converts
  this.counter = new ReactiveVar(0);
});

Template.body.onCreated(function bodyOnCreated()) {
  this.state = new ReactiveDict();
}

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
import '../imports/ui/upcoming.js';
