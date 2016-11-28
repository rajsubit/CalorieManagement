"use strict";

var React = require('react');
var Input = require('../common/textInput');

var MealForm = React.createClass({
	propTypes: {
		meal: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Meal</h1>
				<Input
					name="name"
					type="text"
					label="Meal Name"
					value={this.props.meal.name}
					onChange={this.props.onChange}
					error={this.props.errors.mealName} />
				<Input
					name="date"
					type="date"
					label="Date"
					value={this.props.meal.date}
					onChange={this.props.onChange}
					error={this.props.errors.date} />
				<Input
					name="time"
					type="time"
					label="Time"
					value={this.props.meal.time}
					onChange={this.props.onChange}
					error={this.props.errors.time} />
				<Input
					name="calorie"
					type="number"
					label="Calorie"
					value={this.props.meal.calorie}
					onChange={this.props.onChange}
					error={this.props.errors.calorie}
					min="0" />

				<input type="submit"
					id="mealSaveButton"
					value="Save"
					className="btn btn-primary"
					onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = MealForm;
