var _ = require('mithril');

var HomePage = require('./components/homePage.js');

_.route.mode = "hash";

_.route(document.body, "/", {
	"/": HomePage
});
