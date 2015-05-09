'use strict';

angular.module('appcki.user')
    .factory('UserService', ['$http', '$localStorage','apiUrl', function($http, $localStorage, apiUrl){
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        $http.defaults.useXDomain = true;

        return {
            getUserFromToken: getUserFromToken,
            signin: function(data, success, error) {
                console.log(data);
               // console.log(error);
                
                $http.post(apiUrl + 'login', data)
                    .success(function(data, status, headers, config){
                        console.log(headers)
                        //$localStorage.token = data.token;
                        console.log(data);
                        success(data);
                    })
                    .error(error)
            },
            me: function(success, error) {
                $http.get(apiUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);