'use strict';

angular
    .module('appcki.agenda')
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

            $http.get(apiUrl + "/public/agenda/older", {params:{ timestamp: state.oldest }})
            .success(function(data){
                callback(data);
            });
        };

        var getDetails = function(id, callback){

            $http.get(apiUrl + "/public/agenda/"+id)
            .success(function(data){
                callback(data);
            });
        };

        var createState = function(){
            var today = new Date();
            return {
                newest: today.getTime(),
                oldest: today.getTime()
            };
        };

        var isSubscribed = function(agenda, me){
            for(var i=0; i < agenda.participants.length; i++){
                var participant = agenda.participants[i];
                if(participant.person.id == me.id){
                    return true;
                }
            }
            return false;
        }   

        var subscribe = function(id, note, callback){
            // ..
        };

        var unSubscribe = function(id, callback){
            // ..  
        };

        return {
            createState: createState,
            getNewer: getNewer,
            getOlder: getOlder,
            getDetails:getDetails,
            subscribe:subscribe,
            unSubscribe:unSubscribe,
            isSubscribed:isSubscribed
        };
    }
]);