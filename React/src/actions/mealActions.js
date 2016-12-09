"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var MealApi = require('../api/mealApi');
var ActionTypes = require('../constants/actionTypes');

var MealActions = {
	// createMeal: function(meal) {
	// 	var newMeal = AuthorApi.saveAuthor(author);

	// 	// Hey dispatcher, go tell all the stores that an author
	// 	// was just created.
	// 	Dispatcher.dispatch({
	// 		actionType: ActionTypes.CREATE_AUTHOR,
	// 		author: newAuthor
	// 	});
	// },

	updateMeal: function(meal) {
		var updatedMeal = MealApi.updateMeal(meal);
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_MEAL,
			meal: updatedMeal
		});
		return updatedMeal;
	},

	deleteMeal: function(meal) {
		MealApi.deleteMeal(meal);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_MEAL,
			meal: meal
		});
	}
};

module.exports = MealActions;
