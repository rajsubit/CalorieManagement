"use strict";

var _ = require('mithril');
var m = require('mithril');
var component = require('mithril-componentx');

var App = require('./app.js');

var home = component({
	oninit: function(vnode) {
		console.log('homepage init');
	},

	view: function(vnode){
		return m("div", {class: "jumbotron"},
				m("h1", "User Calorie Management"),
				m("p", "Django and Mithril App for managing calorie consumption of Users")
			);
	}
});

// var HomePage = (args) => {
// 	args.content = home;
// 	return _(App, args);
// };

var homePage = function(args) {
	args.content = home;
	return _(App, args);
};

module.exports = homePage({});