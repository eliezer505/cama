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

    var club = angular.module("app", [
        'ngMaterial',
        'ui.router',
        'wu.masonry',
        'ngMessages',
        "firebase",
        "mdPickers",
        "vsGoogleAutocomplete",
        "imageupload"
    ]);

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

//            $transitions.onStart({}, function (trans) {
//                console.log(trans);
//                var SpinnerService = trans.injector().get('SpinnerService');
//                console.log(SpinnerService);
//                SpinnerService.transitionStart();
//                trans.promise.finally(SpinnerService.transitionEnd);
//            });

//            $rootScope.spinnerActive = true;
//            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
//                console.log('enter rootscope');
//
//                console.log(error);
//                if (error === "AUTH_REQUIRED") {
//                    $state.go("login");
//                }
//            });

//            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//                if (toState.resolve) {
//                    
//                }
//            });
//            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//                if (toState.resolve) {
//                    $rootScope.spinnerActive = false;
//                }
//            });
            $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeStart " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
                $rootScope.spinnerActive = true;
            });
            $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
                $rootScope.spinnerActive = false;
            });
            $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
                console.log("$stateChangeError " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
                $rootScope.spinnerActive = false;
                
                if (angular.isObject(error) && angular.isString(error.code)) {
                    console.log(error.code);
                    switch (error.code) {
                        case 'AUTH_REQUIRED':
                            // go to the login page
                            console.log('auth');
                            $state.go('login');
                            break;
                         case 'MANAGMENT':
                            $state.go('managment');
                            break;    
                        default:
                            // set the error object on the error state and go there
                            $state.get('error').error = error;
                            $state.go('error');
                    }
                } else {
                    // unexpected error
                    console.log('in else');
                    $state.go('login');
                }


//                console.log(error);
//
//                if (error === "AUTH_REQUIRED") {
//                    $state.go("login");
//                }
            });

        }]);


})();

