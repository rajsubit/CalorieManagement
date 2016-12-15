"use strict";

var storeImport = require('elastic-store');
var store = storeImport.Store;
var logger = require('elastic-store-logger');
var _ = require('lodash');
var m = require('mithril');
var axios = require('axios');

var mealList = [];

var api = function(actionPath, next, astore){
	return function(state, payload) {
		// if payload.method and payload.url does not exist then not an API call
		if (!payload.method && !payload.url){

			return next(state, payload);
		}

		// perform API call
		return axios({
			url: payload.url,
			method: payload.method,
			data: payload.data,
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken"
		})
		.then(function(response){
			if(payload.method === "get" && !payload.id){
				astore.dispatch(actionPath + ".setData", response.data);
			}

			else if(payload.method === "post" && !payload.type){
				astore.dispatch(actionPath + ".create", response.data);
			}

			else if(payload.method === "put"){
				astore.dispatch(actionPath + ".update", response.data);	
			}

			else if(payload.method === "delete"){
				astore.dispatch(actionPath + ".delete", payload.id);
			}
		})
		.catch(function(error){
			console.log(error);
		}).
		then(function(){
			m.redraw();
		});
	};
};

var actionTypes = function(initialData){
	return {
		init: function() {
			return JSON.parse(JSON.stringify(initialData));
		},

		setData: function(state, data){
			state.data = data;
			console.log('setdata', state.data);
			return state;
		},

		setUserDetail: function(state, data){
			state.detail = data;
			return state;
		},

		unsetUserDetail: function(state){
			if ("detail" in state){
				state.detail = null;
			}
			return state;
		},
		
		create: function(state, newRecord) {
			state.data.push(newRecord);			
			return state;
		},

		update: function(state, updatedRecord) {
			var index = _.findIndex(state.data, function(record){
				return record.id === updatedRecord.id;
			});
			state.data.splice(index, 1, updatedRecord);
			return state;
		},

		delete: function(state, recordId) {
			var restData = _.filter(state.data, function(arecord){
				return arecord.id + '' !== recordId;
			});

			state.data = restData;
			return state;
		}
	};
};

var actions = {
	meal: actionTypes({type: "meal", data: []}),
	user: actionTypes({type: "user", data: [], detail: null})
};

var middlewares = [logger.logger(), api];

var astore = store(actions, middlewares);

module.exports = astore;
