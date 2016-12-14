"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');
var axios = require('axios');

var App = require('./app.js');
var store = require('../stores/mealStore.js');

var logout = function(){
	axios({
			url: 'http://localhost:8000/user/api/logout/',
			method: "post",
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken"
		})
		.then(function(response){
			if (response.status === 200){
				store.dispatch("user.unsetUserDetail");
				console.log(store().user.detail);
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
		var user = store().user.detail;
		self.login = "Login";
		if("id" in user) {
			self.login = "Logout";
		}
	},

	view: function(vnode){
		var self = this;
		return _("div", {class: "jumbotron"},
				_("h1", "User Calorie Management"),
				_("p", "Django and Mithril App for managing calorie consumption of Users"),
				_("button", {class: "btn btn-success", onclick: logout}, self.login)
			);
	}
});

var homePage = function(args) {
	args.content = home;
	return _(App, args);
};

module.exports = home;