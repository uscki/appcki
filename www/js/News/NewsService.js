angular
    .module('appcki.news')
    .factory('NewsService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';
        
        var NewsService  ={};

        NewsService.getNewer = function(state, callback, finish){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data);
            })
            .finally(function(){
                finish();
            });
        };

        NewsService.getOlder = function(state, callback, error, finish){
            $http.get(apiUrl + "news/overview")
            .success(function(data){
                callback(data);
            })
            .error(function(){
                error();
            })
            .finally(function(){
                finish();
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