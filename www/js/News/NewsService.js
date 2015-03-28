'use strict';

angular
    .module('appcki.news')
    .factory('NewsService', ['$http', 'apiUrl', function($http,apiUrl){
        var NewsService  ={};

        NewsService.getNewer = function(state, callback){
            $http.get(apiUrl + "/public/news/newer", {params:{ id: state.newest }})
            .success(function(data){
                callback(data);
            });
        };

        NewsService.getOlder = function(state, callback){
            $http.get(apiUrl + "/public/news/older", {params:{ id: state.oldest }})
            .success(function(data){
                callback(data);
            });
        };

        NewsService.getDetails = function(id, callback){

            $http.get(apiUrl + "/public/news/"+id)
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