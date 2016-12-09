"use strict";

var m = require('mithril');
var component = require('mithril-componentx');

var Header = require('./common/header.js');

var App = component({
	oninit: function(vnode) {
		console.log('app init');
	},
	view: function(vnode){
		return [
					m(Header),
					m("div", {class: "container-fluid"},
						m(vnode.attrs.content)
					)
				];
	}
});

module.exports = App;
