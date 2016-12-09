"use strict";

var m = require('mithril');
var component = require('mithril-componentx');

var Header = component({
	oninit: function(vnode){
		console.log('init');
	},
	view: function(vnode){
		return m("nav", {class: "navbar navbar-default"},
				m("div", {class: "container-fluid"},
					m("ul", {class: "nav navbar-nav"},
						m("li", "Home"),
						m("li", "Meals")
					)
				)
			);
	}
});

module.exports = Header;
