'use strict';

angular.module('appcki')
    .factory('AgendaService', ['$http', 'apiUrl', function($http,apiUrl){
        
        var defaultState = {
            newest:-1,
            oldest:-1
        };

        var getNewer = function(state, callback){
            state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/newer", {params:{ id: state.newest }})
            .success(function(data){

                callback(data);
            });
        };

        var getOlder = function(state, callback){
            state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/older", {params:{ id: state.older }});
        }

        return {
            getNewer: getNewer,
            getOlder: getOlder
        };
    }
]);