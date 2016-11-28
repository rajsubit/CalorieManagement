"use strict";

var React = require('react');
var Link = require('react-router').Link;

var MealList = React.createClass({

	propTypes: {
		meals: React.PropTypes.array.isRequired
	},

	render: function() {
		var createMealRow = function(meal) {
			return (
				<tr key={meal.id}>
						<td><Link to="manageMeal" params={{id: meal.id}}>{meal.name}</Link></td>
						<td>{meal.date}</td>
						<td>{meal.time}</td>
						<td>{meal.calorie}</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th>Meal Name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Calorie</th>
					</thead>
					<tbody>
						{this.props.meals.map(createMealRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = MealList;
