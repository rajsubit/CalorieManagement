"use strict";

var _ = require('mithril');
var m = require('mithril');
var component = require('mithril-componentx');

var App = require('../app.js');
var MealList = require('./mealList.js');
var store = require('../../stores/mealStore.js');

var meals = component({
	oninit: function(vnode){
		store.dispatch("meal",
			{method: "get", url: 'http://localhost:8000/meal/api/list/', data: ''});
	},
	view: function(vnode){
		return m("div",
				m("h1", "MealList"),
				m(
					"a",
					{href: "/meals/add/", config: m.route, class: "btn btn-primary"},
					"Add Meal"),
				m(MealList, {mealData: store().meal.data})
			);
	}
});

var mealPage = function(args) {
	args.content = meals;
	return _(App, args);
};

module.exports = mealPage({});