"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');
var powerform = require('powerform');
var validatex = require('validatex');
var toastr = require('toastr');
var axios = require('axios');

var App = require('../app.js');
var MealForm = require('./mealForm.js');
var store = require('../../stores/mealStore.js');

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
	getMealData: function(){
		if(!this.id)
			{return; }
		var self = this;
		var mealRecord = {};
		axios({
			url: 'http://localhost:8000/meal/api/detail/' + this.id + '/',
			method: "get",
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken"
		})
		.then(function(response){
			if (response.status === 200){
				mealRecord = response.data;
				self.model.data(mealRecord, true);
				_.redraw();
			}
			else {
				console.log(response.error);
			}
		})
		.catch(function(error){
			console.log(error);
		});
	},

	oninit: function(vnode){
		this.id = _.route.param("id");

		this.model = powerform({
			id: {validator: [validatex.required(false)]},
			name: {validator:
				[validatex.required(true, "Meal Name is required")]},
			date: {validator:
				[validatex.required(true, "Date is required"), isDate]},
			time: {validator:
				[validatex.required(true, "Time is required"), isTime]},
			calorie: {validator:
						[validatex.required(true, "Calorie is required"), isNumber]}
		});
		this.getMealData();
	},

	saveMeal: function(e) {
		e.preventDefault();
		var newMeal = this.model.data();
		newMeal.user = 1;
		if (!this.id){
			store.dispatch("meal",
				{method: "post", url: 'http://localhost:8000/meal/api/create/', data: newMeal});
		}
		else {
			var updateUrl = 'http://localhost:8000/meal/api/detail/' + this.id + '/';
			store.dispatch("meal",
				{method: "put", url: updateUrl, data: newMeal});
		}
		toastr.success('Meal is Saved.');
		_.route("/meals/");
	},

	deleteMeal: function(e) {
		e.preventDefault();
		var url = 'http://localhost:8000/meal/api/detail/' + this.id + '/';
		store.dispatch("meal",
			{method: "delete", url: url, data: '', 'id': this.id});
		toastr.success('Meal is Deleted.');
		_.route("/meals/");
	},

	view: function(vnode) {
		return _(MealForm,
			{model: this.model, saveMeal: this.saveMeal.bind(this),
				deleteMeal: this.deleteMeal.bind(this)});
	}
});

var manageMealPage = function(args) {
	args.content = content;
	return _(App, args);
};

module.exports = manageMealPage({});