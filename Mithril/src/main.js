var _ = require('mithril');

var HomePage = require('./components/homePage.js');
var MealPage = require('./components/meals/mealPage.js');
var ManageMealPage = require('./components/meals/manageMealPage.js');

_.route.mode = "hash";

_.route(document.body, "/", {
	"/": HomePage,
	"/meals/": MealPage,
	"/meals/add/": ManageMealPage
});
