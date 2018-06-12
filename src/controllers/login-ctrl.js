LoginApp.controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', 
    function ($scope, $rootScope, $location, authSvc) {

    var reset = function () {
        $scope.error = false;
        $scope.errorMessage = "";
        $scope.currentUser = {};
        $scope.requestInProgress = false;
    }

    // send to home page
    $scope.cancel = function () {
        $location.url('/');
    }
    
    $scope.login = function () {
        $scope.requestInProgress = true;
        $rootScope.$broadcast('user-status', { userStatus : "Logging In..."});
        authSvc.authenticateUser($scope.currentUser, function (data) {
            if (data.success) {
                $rootScope.$broadcast('user-status', { userStatus : "Logged In"});
                $location.url('/userpage');
            } else {
                $scope.requestInProgress = false;
                $rootScope.$broadcast('user-status', { userStatus : "Not Logged In"});
                $scope.error = true;
                $scope.errorMessage = data.errorMessage;
            }
        }, function (error) {
            $scope.requestInProgress = false;
            $rootScope.$broadcast('user-status', { userStatus : "Not Logged In"});  
            $scope.error = true;
            $scope.errorMessage = error;
        });
    }

    var onInit = function () {
        if (authSvc.isAuthenticatedUser()) {
            $rootScope.$broadcast('user-status', { userStatus : "Logged In"});
        } else {
            $rootScope.$broadcast('user-status', { userStatus : "Not Logged In"});
        }
        reset();
    }

    onInit();
}]);