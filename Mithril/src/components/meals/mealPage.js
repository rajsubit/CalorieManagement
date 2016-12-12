"use strict";

var _ = require('mithril');
var m = require('mithril');
var component = require('mithril-componentx');

var App = require('../app.js');
var MealList = require('./mealList.js');

var meals = component({
	view: function(vnode){
		return m("div",
				m("h1", "MealList"),
				m(
					"a",
					{href: "/meals/add/", config: m.route, class: "btn btn-primary"},
					"Add Meal"),
				m(MealList)
			);
	}
});

var mealPage = function(args) {
	args.content = meals;
	return _(App, args);
};

module.exports = mealPage({});