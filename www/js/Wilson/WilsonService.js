'use strict';

angular
    .module('appcki.wilson')
    .factory('WilsonService', ['$http', 'apiUrl', function($http,apiUrl){
		var WilsonService  ={};

		WilsonService.getMyWilson = function(){
			return {
				"name" : "Wilson", 
				"hp": 100,
				
			};
		}

		return WilsonService;
	}]);