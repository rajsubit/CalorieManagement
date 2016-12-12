"use strict";

var m = require('mithril');
var component = require('mithril-componentx');

var MealList = component({
	getTableContent: function(vnode){
		var mealList = [
			{id: 1, name: "Rice", date: "2016-10-01", time: "09:00:00", calorie: 100},
			{id: 2, name: "Meat", date: "2016-10-01", time: "12:00:00", calorie: 200},
			{id: 3, name: "Banana", date: "2016-10-01", time: "15:00:00", calorie: 150}
		];
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
						this.getTableContent()
					)
				)
			);
	}
});

module.exports = MealList;
