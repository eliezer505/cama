(function () {

    var config = {
        "apiKey": "AIzaSyAUoM0RYqF1-wHI_kYV_8LKgIwxmBEweZ8",
        "authDomain": "clubears-156821.firebaseapp.com",
        "databaseURL": "https://clubears-156821.firebaseio.com",
        "projectId": "clubears-156821",
        "storageBucket": "clubears-156821.appspot.com",
        "messagingSenderId": "970903539685"
    };
    firebase.initializeApp(config);

    var club = angular.module("app", ['ngMaterial', 'ui.router', 'wu.masonry', 'ngMessages', "firebase"]);

    club.factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
            return $firebaseAuth();
        }
    ]);

    // UI.ROUTER STUFF
    club.run(["$rootScope", "$state", function ($rootScope, $state) {

            $rootScope.user = null;

            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                console.log('enter rootscope');
                if (error === "AUTH_REQUIRED") {
                    $state.go("login");
                }
            });
        }]);


})();

