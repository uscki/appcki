'use strict';

angular
    .module('appcki.quote')
    .factory('QuoteService', ['$http', 'apiUrl', function($http,apiUrl){
        
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

        QuoteService.createState = function(){
            return 0;
        };

        return QuoteService;
    }
]);