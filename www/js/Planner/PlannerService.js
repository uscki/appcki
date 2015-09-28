angular
    .module('appcki.planner')
    .factory('PlannerService', ['$http', 'apiUrl', function($http,apiUrl){
        'use strict';
        
        var PlannerService = {};

        /**
         * Requests the json for the meetings that are listed on the site.
         * Not sure which filter is applied, or if older meetings get removed
         * from the database so no filter is necessary.
         * Maybe ordering by date would be cool, but hey =)
         * @arg state
         * @arg callback
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
         * @arg id          Meeting ID
         * @arg callback    callback function on succes
         */
        PlannerService.getDetails = function(id, callback){
        	$http.get(apiUrl + 'meeting/get?id=' + id)
        	.success(function(data){
        		callback(data);
        	});
        };

        /**
         * Sets user preference
         * @arg id          meetingpreference id
         * @arg preference  boolean indicating availability of user
         * @arg comment     User comment (optional)
         * @arg callback    callback function on succes
         * @arg error       callback function on error
         */
        PlannerService.setPreference = function(id, preference, comment, callback, error)
        {
            var commentString = (comment) ? '&notes='+escape(comment) : '';
            $http.get(apiUrl + 'meeting/set-slot?id='+id+'&canAttend='+preference+commentString)
            .success(function(data)
            {
                callback(data);
            })
            .error(function(data){
                error(data);
            });
        };

        PlannerService.createState = function() {
           return 0;
        };

        return PlannerService;
    }
]);