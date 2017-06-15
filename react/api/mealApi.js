"use strict";

//This file is mocking a web API by hitting hard coded data.
var _ = require('lodash');
var axios = require('axios');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var MealStore = require('../stores/mealStore');


var clone = function(item) {
    // return cloned copy so that the item is passed by value instead of by reference
    return JSON.parse(JSON.stringify(item));
};

var api = function(config) {
    var apiUrl = config.url;
    if (config.id) {
        apiUrl += config.id + "/";
    }
    return axios({
        url: apiUrl,
        method: config.method,
        params: config.params,
        data: config.data,
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken"})
        .then(function(res) {
            config.onSuccess(res.data);
            return res;
        })
        .catch(function(error) {
            console.log("error in axios:: ", error);
            config.onFailure(error.response.data);
            return error.response;
        });
};

var MealApi = {
    getAllMeals: function() {
        return api({
            url: "http://localhost:8000/api/meal/",
            method: "get",
            onSuccess: function(data) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.INITIALIZE,
                    initialData: {
                        meals: data
                    }
                });
            },
            onFailure: function(error) {
                console.log(error);
                alert(error);
            }
        });
    },

    getMealById: function(mealId) {
        return api({
            url: "http://localhost:8000/api/meal/",
            method: "get",
            id: mealId,
            onSuccess: function(data) {
                return data;
            },
            onFailure: function(error) {
                console.log(error);
                alert(error);
            }
        });
    },
    
    updateMeal: function(meal) {
        var updatedMeal = null;
        var id = meal.id;
        delete meal.id;
        api({
            url: "http://localhost:8000/api/meal/",
            id: id,
            data: meal,
            method: "put",
            onSuccess: function(data) {
                updatedMeal = data;
                Dispatcher.dispatch({
                    actionType: ActionTypes.UPDATE_MEAL,
                    meal: data
                });
            },
            onFailure: function(error) {
                console.log(error);
                alert(error);
            }
        });
        return updatedMeal;
    },

    // createMeal: function(meal) {
    //     var mealCreateUrl = 'http://localhost:8000/meal/api/create/';
    //     var data = {
    //         user: meal.user,
    //         name: meal.name,
    //         date: meal.date,
    //         time: meal.time,
    //         calorie: meal.calorie
    //     };
    //     $.ajax({
    //         url: mealUpdateUrl,
    //         type: "PUT",
    //         data: JSON.stringify(data),
    //         dataType: 'json',
    //         contentType: "application/json",
    //         success: function(responseData) {
    //             console.log('Data updated successfully');
    //         },
    //         error: function( xhr, status, errorThrown ) {
    //             alert(errorThrown);
    //         }
    //     });
    //     return clone(meal);
    // },

    deleteMeal: function(meal) {
        return api({
            url: "http://localhost:8000/api/meal/",
            id: meal.id,
            method: "delete",
            onSuccess: function(data) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.DELETE_MEAL,
                    meal: meal
                });
            },
            onFailure: function(error) {
                console.log(error);
                alert(error);
            }
        });
    }
};

module.exports = {api: api, MealApi: MealApi};