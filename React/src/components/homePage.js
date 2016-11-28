"use strict";

var React = require('react');

var HomePage = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>User Calorie Management</h1>
				<p>Django and React App for managing calorie consumption of Users</p>
			</div>
		);
	}
});

module.exports = HomePage;
