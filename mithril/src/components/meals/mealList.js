"use strict";

var m = require('mithril');
var component = require('mithril-componentx');

var MealList = component({
	getTableContent: function(vnode){
		var mealList = vnode.attrs.mealData;
		return mealList.map(function(meal){
			return m("tr", {dataId: meal.id},
				m("td", meal.name),
				m("td", meal.date),
				m("td", meal.time),
				m("td", meal.calorie)
			);
		});
	},
	view: function(vnode){
		return m("div",
				m("table", {class: "table"},
					m("thead", 
						m("th", "Meal Name"),
						m("th", "Date"),
						m("th", "Time"),
						m("th", "Calorie")
					),
					m("tbody",
						this.getTableContent(vnode)
					)
				)
			);
	}
});

module.exports = MealList;
