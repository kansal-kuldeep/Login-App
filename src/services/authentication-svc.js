LoginApp.service('AuthenticationService', ['$http', '$cookieStore', 
    function ($http, $cookieStore) {
    
        var _autheticateUser = function (currentUser, successCallback, errorCallback) {
            $http.post('/api/authenticate', currentUser ).success(function (data) {
                $cookieStore.put('isAuthenticated', true);
                successCallback(data);
            }).error(function (error) {
                errorCallback(error);
            });
        };

        var _isAuthenticatedUser = function () {
            return !!$cookieStore.get('isAuthenticated');
        }

        var _logoutUser = function () {
            $cookieStore.remove('isAuthenticated');
        }
        
        return {
            authenticateUser: _autheticateUser,
            isAuthenticatedUser: _isAuthenticatedUser,
            logoutUser: _logoutUser
        }
    }
])