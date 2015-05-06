'use strict';

angular
    .module('appcki.planner')
    .factory('PlannerService', ['$http', 'apiUrl', function($http,apiUrl){
        var PlannerService = {};

        /**
         * Requests the json for the meetings that are listed on the site.
         * Not sure which filter is applied, or if older meetings get removed
         * from the database so no filter is necessary.
         * Maybe ordering by date would be cool, but hey =)
		 */
        PlannerService.getMeetings = function(state, callback){
        	$http.get(apiUrl + 'meeting/mymeetings')
        	.success(function(data){
        		callback(data);
        	});
        };

        /**
         * Details for a meeting include the timeslots and the preferences previous
         * users gave there. The latter can be a join over the tables 'meetingpreference'
         * and meeting_person because that makes things easier for us
         */
        PlannerService.getDetails = function(id, callback){
        	$http.get(apiUrl + 'meeting/get?id=' + id)
        	.success(function(data){
        		callback(data);
        	});
        };

        PlannerService.createState = function() {
           return 0;
        };

        PlannerService.getMyResponse = function(planner, me){
            

            for(var i=0; i < planner.noresponse.length; i++){
                var noresponder = planner.noresponse[i];
                if(noresponder.id == me.id){
                    return true;
                }
            }
            return false;
        };

        return PlannerService;
    }
]);