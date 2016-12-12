"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');

var App = require('./app.js');

var home = component({
	view: function(vnode){
		return _("div", {class: "jumbotron"},
				_("h1", "User Calorie Management"),
				_("p", "Django and Mithril App for managing calorie consumption of Users")
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