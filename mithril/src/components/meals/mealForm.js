"use strict";

var m = require('mithril');
var component = require('mithril-componentx');
var validatex = require('validatex');
var required = validatex.required;

var Input = require('../common/textInput.js');

var MealForm = component({
	attrSchema: {
		model: required(true),
		saveMeal: required(true),
		deleteMeal: required(true)
	},

	view: function(vnode) {
		var myAttrs = vnode.attrs;
		return m("form", {class: "form"},
			m("h1", "Manage Meal"),
			m(Input,
			{type: "hidden", model: myAttrs.model.id}),
			m(Input,
			{type: "text", model: myAttrs.model.name,
			label: "Meal Name", placeholder: "Name of the Meal"}),
			m(Input,
			{type: "date", model: myAttrs.model.date,
			label: "Date", placeholder: "Date should be in month/day/year format"}),
			m(Input,
			{type: "time", model: myAttrs.model.time,
			label: "Time", placeholder: "Time should be in hour:minute AM/PM format"}),
			m(Input,
			{type: "text", model: myAttrs.model.calorie,
			label: "Calorie", placeholder: "Calorie input should be a number greater than 0"}),
			m("div", {class: "row"},
				m("div", {class: "col-sm-6"},
					m("button",
					{align: "left", class: "btn btn-primary", "onclick": myAttrs.saveMeal}, "Save")
				),
				m("div", {class: "col-sm-6"},
					m("button",
					{align: "left", class: "btn btn-danger", "onclick": myAttrs.deleteMeal}, "Delete")
				)
			)
		);
	}
});

module.exports = MealForm;
