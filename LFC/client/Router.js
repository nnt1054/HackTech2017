
Router.configure({
	layoutTemplate: "main_layout"
	//loadingTemplate: 'login',
	/*waitOn: function(){
    	if (Accounts.loginServicesConfigured()) {
    		return Meteor.subscribe()
    	}
    }
    */

});



Router.map(function() {
	this.route('login', {
		path: '/',
		template: 'login'
	});
});


Router.map(function() {
	this.route('upcoming', {
		path: '/upcoming',
		template: 'upcoming'
	});
});


Router.map(function() {
	this.route('saved', {
		path: '/saved',
		template: 'saved'
	});
});

Router.map(function() {
	this.route('location', {
		path: '/location',
		template: 'location'
	});
});

Router.map(function() {
	this.route('artist', {
		path: '/artist',
		template: 'artist'
	});
});
