LoginApp.controller('UserpageController', ['$scope', '$rootScope', '$location', 'AuthenticationService', 
    function ($scope, $rootScope, $location, authSvc) {
        
        var ngOnit = function () {
            if (!authSvc.isAuthenticatedUser()) {
                $location.url('/login');
            } else {
                $rootScope.$broadcast('user-status', { userStatus : "Logged In"});
            }
        }

        $scope.logout = function () {
            $scope.requestInProgress = true;
            authSvc.logoutUser();
            $rootScope.$broadcast('user-status', { userStatus : "Logging Out..."});
            $location.url('/login');
        }

        ngOnit();
}]);