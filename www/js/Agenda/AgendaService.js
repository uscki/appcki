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

            $http.get(apiUrl + "agenda/overview")
            .success(function(data){
                callback(data);
            });
        };

        AgendaService.getOlder = function(state, callback){
            state = state || defaultState;

            $http.get(apiUrl + "agenda/overview")
            .success(function(data){
                callback(data);
            });
        };

        AgendaService.getDetails = function(id, callback){

            $http.get(apiUrl + "agenda/get?id="+id)
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

        AgendaService.getSubscription = function(agenda, me){
            for(var i=0; i < agenda.participants.length; i++){
                var participant = agenda.participants[i];
                if(participant.person.id == me.id){
                    return participant;
                }
            }
            return;
        };

        

        AgendaService.subscribe = function(id, note, callback){            
            $http.get(apiUrl + "/agenda/subscribe?id="+id+"&note="+note)
            .success(function(data){
                callback(true);
            });
        };

        AgendaService.getIcalUrl = function(id){
            return apiUrl + "/public/agenda-cal/" + id ;
        }

        AgendaService.unSubscribe = function(id, callback){
            $http.get(apiUrl + "/agenda/unsubscribe?id="+id)
            .success(function(data){
                callback(true);
            });        
        };
        return AgendaService;

    }
]);