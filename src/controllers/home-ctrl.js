LoginApp.controller('HomeController', ['$scope', '$rootScope', 'AuthenticationService', function ($scope, $rootScope, authSvc) {

    var onInit = function () {

        // To check if user is already logged in
        if (authSvc.isAuthenticatedUser()) {
            $rootScope.$broadcast('user-status', { userStatus : "Logged In"});
        } else {
            $rootScope.$broadcast('user-status', { userStatus : "Not Logged In"});
        }
    }

    onInit();
}]);