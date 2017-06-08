(function () {

    angular.module('app').controller("loginCtrl", ["$scope", "Auth", "$state", "$rootScope", "currentAuth", "USERS", "$firebaseObject",
        function ($scope, Auth, $state, $rootScope, currentAuth, USERS, $firebaseObject) {

            $scope.auth = Auth;
            $scope.currentAuth = currentAuth;

            /**
             * Function called when clicking the Login/Logout button.
             */
            // [START buttoncallback]
            $scope.SignIn = function () {
                var provider = new firebase.auth.FacebookAuthProvider();
                provider.addScope('public_profile');
                provider.addScope('user_friends');
                provider.addScope('email');
                firebase.auth().signInWithRedirect(provider);
            };
            // [END buttoncallback]


            firebase.auth().getRedirectResult().then(function (result) {

                if (result.credential && result.user && !$rootScope.user)
                {

                    $rootScope.user = {
                        email: result.additionalUserInfo.profile.email,
                        first_name: result.additionalUserInfo.profile.first_name,
                        last_name: result.additionalUserInfo.profile.last_name,
                        gender: result.additionalUserInfo.profile.gender,
                        face_link: result.additionalUserInfo.profile.link,
                        picture: result.additionalUserInfo.profile.picture.data.url,
                        created: Date.now()
                    };
                }

            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            $scope.auth.$onAuthStateChanged(function (authData) {
                if (authData)
                {
                    var user = $firebaseObject(firebase.database().ref().child('users').child(authData.uid));
                    user.$loaded().then(function (user) {

                        if (user.email)
                        {
                            if (user.phone)
                                $state.go('main', {userObj: user});                   // send user to profile because everything is good and stored
                            else
                                $state.go('phone', {userObj: user});                     // send user to auth phone incase phone not stored on DB
                        } else
                        {
                            user = USERS.AddUser($rootScope.user, authData.uid);          // save user basic profile on DB
                            $state.go('phone', {userObj: user});
                        }
                    });

                }

            });
        }
    ]);
})();