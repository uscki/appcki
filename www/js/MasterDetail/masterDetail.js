angular
	.module('appcki.agenda',[])
//	.controller("...", ['$scope', '$log', '$http','$state',function( $scope, $log, $http, $state){}];
	.directive('masterDetail', function() {
		return {
    		restrict: 'E',
    		scope: {
 				detailed: '=detailed'
 			}
  		};
	});