LoginApp.controller('UserStatusController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    
    $rootScope.$on('user-status', function (event, args) {
        $scope.userStatus = args.userStatus;
    });
}]);