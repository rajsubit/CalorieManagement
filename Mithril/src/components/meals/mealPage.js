"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');

var App = require('../app.js');
var MealList = require('./mealList.js');
var store = require('../../stores/mealStore.js');

var meals = component({
	base: App,
	getDefaultAttrs: function(vnode){
		return {
			content: _("div",
				_("h1", "MealList"),
				_(
					"a",
					{href: "/meals/add/", config: _.route, class: "btn btn-primary"},
					"Add Meal"),
				_(MealList, {mealData: store().meal.data})
			)
		}; 
	},

	oninit: function(vnode){
		var user = store().user;
		if(!user.detail) {
			_.route("/login/");
		}
		else {
			store.dispatch("meal",
				{method: "get", url: 'http://localhost:8000/meal/api/list/', data: ''});
		}
	}
});

module.exports = meals;