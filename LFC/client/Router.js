Router.configure({
	layoutTemplate: "main_layout"

});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
	});
});

Router.map(function() {
	this.route('upcoming', {
		path: '/upcoming',
		template: 'upcoming'
	});
});

Router.map(function() {
	this.route('auth', {
		path: '/auth',
		template: 'auth'
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
