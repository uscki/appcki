'use strict';

angular
    .module('appcki.roephoek')
    .factory('RoephoekService', ['$http', 'apiUrl', function($http,apiUrl){
        var RoephoekService  ={};


        /**
         * Returns all the polls in the archive
         * API should order them new to old
         */
        RoephoekService.getOverview = function(state, page, callback)
        {
        	$http.get(apiUrl + "roephoek/overview&page=" + page).
        	success(function(data){
        		callback(data);
        	});
        }

        RoephoekService.post = function(name, message, callback)
        {
            name = escape(name);
            message = escape(message);
            $http.get(apiUrl + "roephoek/post?name=" + name + "&message=" + message)
            .success(function(data){
                callback(data);
            })
            .error(function(data){
                callback(data);
            });
        }
        

        return RoephoekService;
    }
]);