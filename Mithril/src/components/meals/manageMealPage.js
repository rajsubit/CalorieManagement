"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');
var powerform = require('powerform');
var validatex = require('validatex');

var App = require('../app.js');
var MealForm = require('./mealForm.js');

var isDate = function(date) {
	var format = /^\d{4}-\d{2}-\d{2}$/;
	if (!format.test(date)) {
		return "Date should be in month/day/year format";
	}
};

var isTime = function(time) {
	var format = /^\d{2}:\d{2}$/;
	if (!format.test(time)) {
		return "Time should be in hh:mm AM/PM format";
	}	
};

var isNumber = function(number) {
	var format = /^\d+$/;
	if (!format.test(number)) {
		return "Calorie should be a Number";
	}
};

var content = component({
	oninit: function(vnode){
		this.id = _.route.param("id");

		this.model = powerform({
			name: {validator:
				[validatex.required(true, "Meal Name is required")]},
			date: {validator:
				[validatex.required(true, "Date is required"), isDate]},
			time: {validator:
				[validatex.required(true, "Time is required"), isTime]},
			calorie: {validator:
						[validatex.required(true, "Calorie is required"), isNumber]}
		});
	},

	saveMeal: function(e) {
		e.preventDefault();
		console.log('Save Meal', this.model.data());
		if (this.model.isValid()){
			console.log("Save Meal", this.model.data);
		}
	},

	view: function(vnode) {
		return _(MealForm, {model: this.model, saveMeal: this.saveMeal.bind(this)});
	}
});

var manageMealPage = function(args) {
	console.log("manage meal page");
	args.content = content;
	return _(App, args);
};

module.exports = manageMealPage({});