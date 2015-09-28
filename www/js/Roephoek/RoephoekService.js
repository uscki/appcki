angular
    .module('appcki.roephoek')
    .factory('RoephoekService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';

        var RoephoekService  ={};

        /**
         * Returns all the polls in the archive
         * API should order them new to old
         */
        RoephoekService.getOlder = function(id, callback, error)
        {
            $http({
                url: apiUrl + "shoutbox/older", 
                method: "GET",
                params: {id: id, page: 0, sort: "id,desc"}
            })
        	.success(function(data){
        		callback(data);
        	})
            .error(function(){
                error();
            });
        };


        RoephoekService.getNewer = function(id, callback)
        {
            $http({
                url: apiUrl + "shoutbox/newer", 
                method: "GET",
                params: {id: id, page: 0, sort: "id,asc"}
            })
            .success(function(data){
                callback(data);
            });
        };

        RoephoekService.post = function(name, message, callback, error)
        {
            name = name;
            message = message;
            $http({
                url: apiUrl + "shoutbox/shout", 
                method: "GET",
                params: {nickname: name, message:message}
            })
            .success(function(data){
                callback(data);
            })
            .error(function(data){
                error(data);
            });
        };
        

        return RoephoekService;
    }
]);