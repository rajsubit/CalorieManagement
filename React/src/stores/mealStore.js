"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var MealApi = require('../api/mealApi');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var mealList = [];

var MealStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},

	emitChange: function() {
		this.emit('change');
	},

	getAllMeals: function() {
		mealList = MealApi.getAllMeals();
		return mealList;
	},

	getMealById: function(id) {
		return MealApi.getMealById(id);
	},

	getMealByUser: function(userId) {
		return mealList;
	}
});

Dispatcher.register(function(action){
	switch(action.actionType){
		case ActionTypes.INITIALIZE:
			mealList = action.initialData.meals;
			MealStore.emitChange();
			break;
		default:
			// no opp
	}
});

module.exports = MealStore;