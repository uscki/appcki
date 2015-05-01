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
        	$http.get('js/Planner/api_test/meetings.txt')
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
        	$http.get('js/Planner/api_test/meetingslots.txt')
        	.success(function(data){
        		callback(data);
        	});
        };

        PlannerService.createState = function() {
           return 0;
        };

        return PlannerService;
    }
]);