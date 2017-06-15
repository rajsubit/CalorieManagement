"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var MealApi = require('../api/mealApi').MealApi;

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				meals: MealApi.getAllMeals()
			}
		});
	}
};

module.exports = InitializeActions;
