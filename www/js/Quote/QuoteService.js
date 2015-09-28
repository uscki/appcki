angular
    .module('appcki.quote')
    .factory('QuoteService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';

        var QuoteService  ={};

        QuoteService.getRandom = function(state, callback)
        {
            $http.get(apiUrl + "quote/random")
            .success(function(data){
                callback(data);
            });
        };

        QuoteService.getOverview = function(state, callback)
        {
            $http.get(apiUrl + "quote/overview")
            .success(function(data){
                callback(data);
            });
        };

        QuoteService.getDetails = function(id, callback)
        {
            $http.get(apiUrl + "quote/get?id=" + id)
            .success(function(data){
                callback(data);
            });
        };       

        QuoteService.createState = function(){
            return 0;
        };

        return QuoteService;
    }
]);