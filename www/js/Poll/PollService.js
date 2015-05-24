'use strict';

angular
    .module('appcki.poll')
    .factory('PollService', ['$http', 'apiUrl', function($http,apiUrl){
        var PollService  ={};

        /**
         * Gets the ID for the active poll. 
         * This is always the latest poll
         */
        PollService.getActivePoll = function(callback)
        {
        	$http.get(apiUrl + "poll/overview").success(function(data){
                for(var i = 0; i < data.content.length; i++)
                {
                    if (data.content[i].active){
                        callback(data.content[i]);
                    }
                }
            });
        }

        /**
         * Returns all the polls in the archive
         * API should order them new to old
         */
        PollService.getArchive = function(page, callback, finish)
        {
        	/*$http.get(apiUrl + "poll/overview").
        	success(function(data){
        		callback(data);
        	});*/
            $http({
                url : apiUrl + "poll/overview",
                method : "GET",
                params : {page: page, sort : "id,asc"}
            })
            .success(function(data){
                callback(data)
            })
            .finally(function(){
                finish();
            })
        }

        PollService.getDetails = function(id, callback)
        {
            $http.get(apiUrl + "poll/get?id=" + id)
            .success(function(data){
                callback(data);
            });
        }

        PollService.vote = function(id, callback)
        {
            $http.get(apiUrl + "poll/vote?id=" + id)
            .success(function(data){
                callback(data);
            })
            .error(function(data){
                callback(data);
            });
        }
        

        return PollService;
    }
]);