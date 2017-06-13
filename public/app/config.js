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



            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                console.log('enter rootscope');
                if (error === "AUTH_REQUIRED") {
                    $state.go("login");
                }
            });
        }]);


})();

