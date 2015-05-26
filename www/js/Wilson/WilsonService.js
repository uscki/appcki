angular
    .module('appcki.wilson')
    .factory('WilsonService', ['$http', 'apiUrl', function($http,apiUrl){
    	'use strict';

		var WilsonService  ={};

		WilsonService.getMyWilson = function(){
			return {
				"name" : "Wilson", 
				"hp": 100,
			};
		};

		return WilsonService;
	}]);