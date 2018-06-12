var LoginApp = LoginApp || {};

LoginApp = angular.module('LoginApp', [
    'ngRoute', 
    'ngMockE2E', 
    'ngCookies'
]);

LoginApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'src//templates/home.html'
        }).
        when('/login', {
            templateUrl: 'src/templates/login.html'
        }).
        when('/userpage', {
            templateUrl: 'src/templates/user-page.html'
        }).
        otherwise({
            templateUrl: 'src/templates/home.html'
        });

        // To add a delay in http response
        $httpProvider.interceptors.push(function($timeout) {
            return {
                "response": function (response) {
                    return $timeout(function() {
                        return response;
                    }, 3000);
                }
            };
        });   
}]);

// mock user list
var userList = [
    {
        id: 1,
        username: "user1",
        password: "user1"
    },
    {
        id: 2,
        username: "user2",
        password: "user2"
    },
    {
        id: 3,
        username: "user3",
        password: "user3"
    }
];

var authenticateUser = function (data) {
    var user = userList.find(user => user.username === data.username && user.password === data.password);

    if (user !== undefined) {
        return [200, {success: true, errorMessage: null}, {}];
    } else {
        return [200, {success: false, errorMessage: "Username/ Password is incorrect!"}, {}];
    }
};

LoginApp.run(function ($httpBackend) {

    // mocking authentication end-point
    $httpBackend.whenPOST('/api/authenticate').respond(function(method,url,data) {
        return authenticateUser(JSON.parse(data));  
    });

    $httpBackend.whenGET('src/templates/home.html').passThrough();
    $httpBackend.whenGET('src/templates/login.html').passThrough();
    $httpBackend.whenGET('src/templates/user-page.html').passThrough();
    $httpBackend.whenGET('src/templates/user-status-ptl.html').passThrough();
    
});

