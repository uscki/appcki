angular
    .module('appcki.agenda')
    .factory('AgendaService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';
        
        var AgendaService  = {};


        AgendaService.getOlder = function(id, callback)
        {

            $http({
                url: apiUrl + "agenda/older", 
                method: "GET",
                params: {id: id, page: 0, sort: "startdate,starttime,desc"}
            })
            .success(function(data){
                callback(data);
            });
        };


        AgendaService.getNewer = function(id, callback, error)
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
            });
        };

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
            $http({
                url: apiUrl + "agenda/subscribe?id="+id+"&note="+note,
                method: "GET"
            })
            .success(function(data){
                callback(true);
            });
        };

        AgendaService.getIcalUrl = function(id){
            return apiUrl + "public/agenda-cal/" + id ;
        };

        AgendaService.unSubscribe = function(id, callback){
            $http({
                url: apiUrl + "agenda/unsubscribe?id="+id,
                method: "GET"
            })
            .success(function(data){
                callback(true);
            });        
        };
        
        return AgendaService;

    }
]);