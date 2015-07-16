angular
    .module('appcki.poll')
    .factory('PollService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';

        var PollService  ={};

        /**
         * Gets the ID for the active poll. 
         * This is always the latest poll
         */
        PollService.getActivePoll = function(callback)
        {
        	$http({
                url : apiUrl + "poll/active",
                method : "GET"
            })
            .success(function(data){
                callback(data);
            });
        };

        /**
         * Returns all the polls in the archive
         * API should order them new to old
         */
        PollService.getArchive = function(page, callback, error)
        {
            $http({
                url : apiUrl + "poll/overview",
                method : "GET",
                params : {page: page, sort : "createdate,asc"}
            })
            .success(function(data){
                callback(data);
            })
            .error(function(){
                error();
            });
        };

        PollService.getDetails = function(id, callback)
        {
            $http({
                url : apiUrl + "poll/get",
                method : "GET",
                params: {id: id}
            })
            // $http.get(apiUrl + "poll/get?id=" + id)
            .success(function(data){
                callback(data);
            });
        };

        PollService.vote = function(id, callback)
        {
            $http.get(apiUrl + "poll/vote?id=" + id)
            .success(function(data){
                callback(data);
            })
            .error(function(data){
                callback(data);
            });
        };
        

        return PollService;
    }
]);