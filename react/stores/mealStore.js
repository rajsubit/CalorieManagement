"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var MealApi = require('../api/mealApi').MealApi;
var api = require('../api/mealApi').api;
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
        return mealList;
    },

    getMealById: function(id) {
        var foundMeal = _.find(mealList, {id: id});
        if (!foundMeal) {
            return api({
                url: "http://localhost:8000/api/meal/",
                method: "get",
                id: id,
                onSuccess: function(data) {
                    foundMeal = data;
                },
                onFailure: function(error) {
                    console.log(error);
                    alert(error);
                }
            });
        }
        return foundMeal;
    }
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
            mealList = action.initialData.meals;
            MealStore.emitChange();
            break;
        case ActionTypes.CREATE_MEAL:
            mealList.push(action.meal);
            MealStore.emitChange();
            break;
        case ActionTypes.UPDATE_MEAL:
            var existingMeal = _.find(mealList, {id: action.meal.id});
            var existingMealIndex = _.indexOf(mealList, existingMeal);
            mealList.splice(existingMealIndex, 1, action.meal);
            MealStore.emitChange();
            break;
        case ActionTypes.DELETE_MEAL:
            _.remove(mealList, function(meal){
                return action.id === meal.id;
            });
            MealStore.emitChange();
            break;
        default:
            // no opp
    }
});

module.exports = MealStore;