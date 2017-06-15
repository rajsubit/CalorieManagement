"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');
var axios = require('axios');

var App = require('./app.js');
var store = require('../stores/mealStore.js');

var logout = function(e){
	e.preventDefault();
	store.dispatch("user.unsetUserDetail", {});
	return axios({
			url: 'http://localhost:8000/user/api/logout/',
			method: "post",
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken"
		})
		.then(function(response){
			if (response.status === 200){
				console.log(store().user.detail, {});
				_.route('/');
				_.redraw();
			}
			else {
				console.log('hello', response.detail, response.error);
			}
		})
		.catch(function(error){
			console.log(error);
		});
};

var home = component({
	oninit: function(vnode){
		var self = this;
		var user = store().user;
		self.login = "Login";
		self.logoutDisplay = "none";
		self.loginDisplay = '';
		if(user.detail) {
			self.login = "Logout";
			self.loginDisplay = "none";
			self.logoutDisplay = "";
		}
	},

	view: function(vnode){
		var self = this;
		return _("div", {class: "jumbotron"},
				_("h1", "User Calorie Management"),
				_("p", "Django and Mithril App for managing calorie consumption of Users"),
				_("a",
					{class: "btn btn-success", href: "/login/", config: _.route,
					onclick: self.clickEvent, style: {display: self.loginDisplay}},
					self.login),
				_("button",
					{class: "btn btn-success", onclick: logout,
					style: {display: self.logoutDisplay}}, self.login)
			);
	}
});

var homePage = function(args) {
	args.content = home;
	return _(App, args);
};

module.exports = home;