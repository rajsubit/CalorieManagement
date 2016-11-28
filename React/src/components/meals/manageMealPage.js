"use strict";

var React = require('react');
var Router = require('react-router');
var MealStore = require('../../stores/mealStore');
var MealForm = require('./mealForm');
var MealActions = require('../../actions/mealActions');
var toastr = require('toastr');

var ManageMealPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			meal: {
				'id': '', 'name': '',
				'date': '', 'time': '', 'calorie': ''
			},
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var mealId = this.props.params.id;
		if (mealId) {
			this.setState({meal: MealStore.getMealById(mealId)});
		}
	},

	setMealState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.meal[field] = value;
		return this.setState({meal: this.state.meal});
	},

	saveMeal: function(event){
		event.preventDefault();
		if (this.state.meal.id) {
			MealActions.updateMeal(this.state.meal);
		}
		// else {
		// 	MealActions.createAuthor(this.state.author);
		// }
		this.setState({dirty: false});
		toastr.success('Meal is Saved.');
		this.transitionTo('meals');
	},

	render: function() {
		return (
			<MealForm meal={this.state.meal}
				onChange={this.setMealState}
				onSave={this.saveMeal}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageMealPage;
