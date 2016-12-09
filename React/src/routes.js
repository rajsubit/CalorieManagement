"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
	<Route name="app" path="/" handler={require("./components/app")}>
		<DefaultRoute handler={require("./components/homePage")} />
		<Route name="meals" handler={require("./components/meals/mealPage")} />
		<Route name="addMeal" path="meal" handler={require("./components/meals/manageMealPage")} />
		<Route name="manageMeal" path="meal/:id" handler={require("./components/meals/manageMealPage")} />
	</Route>
);

module.exports = routes;
