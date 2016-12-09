"use strict";

//This file is mocking a web API by hitting hard coded data.
var meals = [];
var _ = require('lodash');
$ = jQuery = require('jquery');

//This would be performed on the server in a real app. Just stubbing in.
// var generateId = function(author) {
//  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
// };

var clone = function(item) {
    return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var MealApi = {
    getAllMeals: function() {
        var mealListUrl = 'http://localhost:8000/meal/api/list/';
        $.ajax({
            async: false,
            type: 'GET',
            url: mealListUrl,
            success: function(data) {
                meals = data;
            }
        });
        return clone(meals);
    },

    getMealById: function(id) {
        var meal = null;
        var mealRetrieveUrl = 'http://localhost:8000/meal/api/detail/' + id.toString() + '/';
        $.ajax({
            async: false,
            type: 'GET',
            url: mealRetrieveUrl,
            success: function(data) {
                meal = data;
            }
        });
        return clone(meal);
    },

    getMealByUser: function(userId) {
        // var meal = _.find(authors, {id: id});
        // return clone(author);
    },
    
    updateMeal: function(meal) {
        var mealUpdateUrl = 'http://localhost:8000/meal/api/detail/' + meal.id.toString() + '/';
        var data = {
            user: meal.user,
            name: meal.name,
            date: meal.date,
            time: meal.time,
            calorie: meal.calorie
        };
        $.ajax({
            url: mealUpdateUrl,
            type: "PUT",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(responseData) {
                console.log('Data updated successfully');
            },
            error: function( xhr, status, errorThrown ) {
                alert(errorThrown);
            }
        });
        return clone(meal);
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
        var mealDeleteUrl = 'http://localhost:8000/meal/api/detail/' + meal.id.toString() + '/';
        var data = {
            user: meal.user,
            name: meal.name,
            date: meal.date,
            time: meal.time,
            calorie: meal.calorie
        };
        $.ajax({
            url: mealDeleteUrl,
            type: "DELETE",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(responseData) {
                console.log('Data deleted successfully');
            },
            error: function( xhr, status, errorThrown ) {
                alert(errorThrown);
            }
        });
        return clone(meal);
    }
};

module.exports = MealApi;