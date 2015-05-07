'use strict';

angular
    .module('appcki.news')
    .factory('NewsService', ['$http', 'apiUrl', function($http,apiUrl){
        var NewsService  ={};

        NewsService.getNewer = function(state, callback){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data.content);
            });
        };

        NewsService.getOlder = function(state, callback){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data.content);
            });
        };

        NewsService.getDetails = function(id, callback){
            console.log('getting details');
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