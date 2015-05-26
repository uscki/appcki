angular
    .module('appcki.leden')
    .factory('LedenService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';

        var LedenService  ={};

        /**
         * Gets the ID for the active poll. 
         * This is always the latest poll
         */
        LedenService.getOverview = function(state, callback)
        {
        	$http.get(apiUrl + "leden/overview")
            .success(function(data){
                callback(data);
            });
        };

        LedenService.getDetails = function(id, callback)
        {
            $http.get(apiUrl + "leden/get?id=" + id)
            .success(function(data){
                callback(data);
            });
        };       

        return LedenService;
    }
]);