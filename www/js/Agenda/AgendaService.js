'use strict';

angular
    .module('appcki.agenda')
    .factory('AgendaService', ['$http', 'apiUrl', function($http,apiUrl){
        var AgendaService  ={};

        var defaultState = {
            newest:-1,
            oldest:-1
        };

        AgendaService.getNewer = function(state, callback){
           // state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/newer", {params:{ timestamp: state.newest }})
            .success(function(data){
                callback(data);
            });
        };

        AgendaService.getOlder = function(state, callback){
            state = state || defaultState;

            $http.get(apiUrl + "/public/agenda/older", {params:{ timestamp: state.oldest }})
            .success(function(data){
                callback(data);
            });
        };

        AgendaService.getDetails = function(id, callback){

            $http.get(apiUrl + "/public/agenda/"+id)
            .success(function(data){
                callback(data);
            });
        };

        AgendaService.createState = function(){
            var today = new Date();
            return {
                newest: today.getTime(),
                oldest: today.getTime()
            };
        };

        AgendaService.isSubscribed = function(agenda, me){
            for(var i=0; i < agenda.participants.length; i++){
                var participant = agenda.participants[i];
                if(participant.person.id == me.id){
                    return true;
                }
            }
            return false;
        };

        

        AgendaService.subscribe = function(id, note, callback){
            // ..
            callback(true);
        };

        AgendaService.unSubscribe = function(id, callback){
            // ..  
            callback(true);
        };
        return AgendaService;
        /*
        return {
            createState: createState,
            getNewer: getNewer,
            getOlder: getOlder,
            getDetails:getDetails,
            subscribe:subscribe,
            unSubscribe:unSubscribe,
            isSubscribed:isSubscribed
        };*/
    }
]);