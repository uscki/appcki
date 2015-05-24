'use strict';

angular
    .module('appcki.agenda')
    .factory('AgendaService', ['$http', 'apiUrl', function($http,apiUrl){
        var AgendaService  = {};


        AgendaService.getOlder = function(id, callback, finish)
        {

            $http({
                url: apiUrl + "agenda/older", 
                method: "GET",
                params: {id: id, page: 0, sort: "startdate,starttime,desc"}
            })
            .success(function(data){
                callback(data);
            })
            .finally(function(){
                finish();
            });
        }


        AgendaService.getNewer = function(id, callback, error, finish)
        {
            $http({
                url: apiUrl + "agenda/newer", 
                method: "GET",
                params: {id: id, page: 0, sort: "startdate,starttime,asc"}
            })
            .success(function(data){
                callback(data);
            }).error(function(){
                error();
            })
            .finally(function(){
                finish();
            });
        }

        AgendaService.getDetails = function(id, callback){
            $http({
                url: apiUrl + "agenda/get", 
                method: "GET",
                params: {id: id}
            })
            .success(function(data){
                callback(data);
            });
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