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

	mealFormIsValid: function() {
		var formIsValid = true;
		this.state.erros = {};
		if (this.state.meal.name.length < 1){
			this.state.errors.name = "Meal Name is Required";
			formIsValid = false;
		}
		if (this.state.meal.date.length < 1){
			this.state.errors.date = "Date is Required";
			formIsValid = false;	
		} else if (this.state.meal.date.split('-').length !== 3) {
			this.state.errors.date = "Date should be in month/day/year format";
			formIsValid = false;
		}
		if (this.state.meal.time.length < 1){
			this.state.errors.time = "Time is Required";
			formIsValid = false;	
		} else if (this.state.meal.time.split(':').length !== 3) {
			this.state.errors.time = "Time should be in hour:minute AM/PM format";
			formIsValid = false;
		}
		if (this.state.meal.calorie.length < 1){
			this.state.errors.calorie = "Calorie is Required";
			formIsValid = false;
		} else if (isNaN(parseInt(this.state.meal.calorie))) {
			this.state.errors.calorie = "Calorie should be a Number";
			formIsValid = false;
		}
		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveMeal: function(event){
		event.preventDefault();
		if (!this.mealFormIsValid()){
			return;
		}
		var updatedMeal = null;
		if (this.state.meal.id) {
			updatedMeal = MealActions.updateMeal(this.state.meal);
		}
		// else {
		// 	MealActions.createAuthor(this.state.author);
		// }
		console.log('meal', updatedMeal);
		this.setState({dirty: false});
		if (updatedMeal !== null){
			toastr.success('Meal is Saved.');
			this.transitionTo('meals');
		}
	},

	deleteMeal: function(event) {
		event.preventDefault();
		if (this.state.meal.id) {
			MealActions.deleteMeal(this.state.meal);
		}
		toastr.error('Meal is Deleted.');
		this.transitionTo('meals');
	},

	render: function() {
		return (
			<MealForm meal={this.state.meal}
				onChange={this.setMealState}
				onSave={this.saveMeal}
				errors={this.state.errors}
				onClick={this.deleteMeal} />
		);
	}
});

module.exports = ManageMealPage;
