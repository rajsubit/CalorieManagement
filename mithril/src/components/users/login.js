"use strict";

var _ = require('mithril');
var component = require('mithril-componentx');
var powerform = require('powerform');
var validatex = require('validatex');
var axios = require('axios');

var App = require('../app.js');
var Input = require('../common/textInput.js');
var store = require('../../stores/mealStore.js');

// var ispassword = function(value){
// 	if (!value) {
// 		return "Password is required.";
// 	}

// 	if (!/.{8,}/.test(value)) {
// 		return "Password must be at least 8 characters long.";
// 	}
// }

var loginView = component({
	oninit: function(vnode){
		this.model = powerform({
			username: {validator: validatex.required(true, "Username Name is required")},
			password: {validator: validatex.required(true, "Password is required")}
		});
	},

	submit: function(e) {
		var self = this;
		e.preventDefault();
		if (!self.model.isValid()){
			return;
		}
		axios({
			url: 'http://localhost:8000/user/api/login/',
			method: "post",
			data: self.model.data(),
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken"
		})
		.then(function(response){
			store.dispatch("user.setUserDetail", response.data);
			_.route('/meal/');
		})
		.catch(function(error){
			console.log(error);
		})
		.then(function(){
			_.redraw();
		});
	},

	view: function(vnode){
		var self = this;
		
		return _("div", {style: {width: "350px"}},
				_("h3", "User Calorie Management"),
				_("form", {class: "form", onsubmit: this.submit.bind(this)},
					_(Input,
						{type: "text", model: this.model.username,
						label: "Username", placeholder: "Type your username"}),
					_(Input,
						{type: "password", model: this.model.password,
						label: "Password", placeholder: "Type your password"}),
					_("input",
						{type: "submit", class: "btn btn-success", value: "Sign in"})
				)
			);
	}
});

var LoginPage = component({
	base: App,
	getDefaultAttrs: function(vnode) {
		return {
			content: loginView
		};
	},

	oninit: function(vnode) {
		var user = store().user;
		if(user.detail) {
			_.route("/meals/");
		}
	}
});

module.exports = LoginPage;
