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
						m("li",
							m("a", {href: "#"}, "Home")
						),
						m("li",
							m("a", {href: "#"}, "Meals")
						)
					)
				)
			);
	}
});

module.exports = Header;
