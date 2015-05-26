angular
    .module('appcki.captioncontest')
    .factory('CaptioncontestService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';
        
        var CaptioncontestService  ={};

        /**
         * Gets the ID for the active captioncontest. 
         */
        CaptioncontestService.getActiveContest = function(state, callback)
        {
        	$http.get(apiUrl + "captioncontest/active").success(function(data){
                callback(data);
            });
        };

        /**
         * Returns all the contests in the archive
         * API should order them new to old
         */
        CaptioncontestService.getArchive = function(state, callback)
        {
        	$http.get(apiUrl + "captioncontest/overview")
        	.success(function(data){
        		callback(data);
        	});
        };

        CaptioncontestService.vote = function(id, callback)
        {
            $http.get(apiUrl + "captioncontest/vote?id=" + id)
            .success(function(data){
                callback(data);
            })
            .error(function(data){
                callback(data);
            });
        };
        
        return CaptioncontestService;
    }
]);