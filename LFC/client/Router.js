Router.configure({
	layoutTemplate: "main-layout"
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

