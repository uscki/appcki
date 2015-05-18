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

            $http({
                url: "shoutbox/overview", 
                method: "GET",
                params: {page: page, sort: "id,desc"}
            })
        	success(function(data){
        		callback(data);
        	});
        }


        RoephoekService.getNewer = function(state, page, callback)
        {
        /*
            state.id = last id
        */
            $http({
                url: "shoutbox/newer", 
                method: "GET",
                params: {id: state.id, page: page, sort: "id,desc"}
            })
            success(function(data){
                callback(data);
            });
        }

        RoephoekService.post = function(name, message, callback)
        {
            name = escape(name);
            message = escape(message);
//            $http.get(apiUrl + "shoutbox/post?name=" + name + "&message=" + message)
            $http({
                url: "shoutbox/shout", 
                method: "GET",
                params: {nickname: name, message:message}
            })
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