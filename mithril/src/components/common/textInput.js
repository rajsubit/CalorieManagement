"use strict";

var m = require('mithril');
var component = require('mithril-componentx');
var Validatex = require('validatex');

var required = Validatex.required; 

var Input = component({
	name: "field",
	attrSchema: {
		model: required(true),
		type: required(true)
	},

	view: function(vnode) {
		var myAttrs = vnode.attrs;
		var wrapperClass = "form-group";
		if (myAttrs.model.error()){
			wrapperClass += " " + "has-error";
		}
		var inputAttrs = {
			type: myAttrs.type,
			class: "form-control",
			placeholder: myAttrs.placeholder
		};
		inputAttrs.value = myAttrs.model();
		inputAttrs.onchange = m.withAttr("value", myAttrs.model);

		return m("div", {class: wrapperClass},
			m("label", {for: myAttrs.label}, myAttrs.label),
			m("div", {class: "field"},
				m("input", inputAttrs),
				m("div", {class: "input"}, myAttrs.model.error())
			)
		);
	}
});

module.exports = Input;
