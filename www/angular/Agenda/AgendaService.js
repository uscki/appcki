'use strict';

angular.module('appcki')
    .factory('AgendaService', ['$http', 'apiUrl', function($http,apiUrl){
        
        var defaultState = {
            newest:-1,
            oldest:-1
        };

        var getNewer = function(state, callback){
           // state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/newer", {params:{ timestamp: state.newest }})
            .success(function(data){

                callback(data);
            });
        };

        var getOlder = function(state, callback){
            state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/older", {params:{ timestamp: state.oldest }});
        };

        var createState = function(){
            var today = new Date();
            return {
                newest: today.getTime(),
                oldest: today.getTime()
            };
        }

        return {
            createState: createState,
            getNewer: getNewer,
            getOlder: getOlder
        };
    }
]);