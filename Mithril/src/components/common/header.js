"use strict";

var m = require('mithril');
var component = require('mithril-componentx');

var Header = component({
	view: function(vnode){
		return m("nav", {class: "navbar navbar-default"},
				m("div", {class: "container-fluid"},
					m("ul", {class: "nav navbar-nav"},
						m("li",
							m("a", {href: "#", config: m.route}, "Home")
						),
						m("li",
							m("a", {href: "/meals/", config: m.route}, "Meals")
						)
					)
				)
			);
	}
});

module.exports = Header;
