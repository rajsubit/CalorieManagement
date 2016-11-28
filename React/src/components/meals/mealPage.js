"use strict";

var React = require('react');
var MealStore = require('../../stores/mealStore');
var MealList = require('./mealList');

var MealPage = React.createClass({

	getInitialState: function() {
		return {
			meals: MealStore.getAllMeals()
		};
	},

	componentWillMount: function() {
		MealStore.addChangeListener(this.onChange);		
	},

	componentWillUnmount: function() {
		MealStore.removeChangeListener(this.onChange);		
	},	

	onChange: function() {
		this.setState({meals: MealStore.getAllMeals()});
	},

	render: function() {
		console.log(this.state.meals);
		return (
			<div>
				<h1>Meal List</h1>
				<MealList meals={this.state.meals} />
			</div>
		);
	}
});

module.exports = MealPage;
