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

//    club.factory("currentUser",
//            function () {
//                return firebase.auth().currentUser;
//            }
//    );


//    club.service('getData', function ($q, Auth) {
//	var service = {};
//        
//        this.getInitialData = function () {
//            //define my promises
//            var one = $q.defer();
////		var two = $q.defer();
////		var all = $q.all([one.promise, two.promise]);
//
//
//            Auth.$onAuthStateChanged(function (authData) {
//                if (authData)
//                {
//                     one.resolve(authData.uid);
//
//                }else
//                {
//                    one.resolve(null);
//                }
//
//            });
//
//
//
//
//
//            return one.promise;
//        };
//
//
//    });


    // UI.ROUTER STUFF
    club.run(["$rootScope", "$state", function ($rootScope, $state) {

//            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
//                console.log(fromState);
//                console.log(toState);
//                // check if root scope
//                if (fromState.name == '') {
//
//                    // add resolve dependency to root's child
//                    if (!toState.resolve)
//                        toState.resolve = {};
//                    toState.resolve.currentAuth = ["Auth", function (Auth) {
//                            console.log(Auth);
//                            return Auth.$waitForSignIn();
//                        }];
//
//
//                }
//            });

//state.defaultErrorHandler()

            $rootScope.spinnerActive = true;
            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                console.log('enter rootscope');

                console.log(error);
                if (error === "AUTH_REQUIRED") {
                    $state.go("login");
                }
            });

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.resolve) {
                     $rootScope.spinnerActive = true;
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (toState.resolve) {
                     $rootScope.spinnerActive = false;
                }
            });


        }]);


})();

