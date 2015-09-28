angular
    .module('appcki.news')
    .factory('NewsService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';
        
        var NewsService  ={};

        NewsService.getNewer = function(state, callback){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data);
            });
        };

        NewsService.getOlder = function(state, callback, error){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data);
            })
            .error(function(){
                error();
            });
        };

        NewsService.getDetails = function(id, callback){
            $http.get(apiUrl + "news/get?id="+id)
            .success(function(data){
                callback(data);
            });
        };

        NewsService.createState = function(){
            return 0;
        };

        return NewsService;
    }
]);