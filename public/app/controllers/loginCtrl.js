(function () {

    angular.module('app').controller("loginCtrl",
            function ($scope, Auth, $state, currentAuth, USERS, userObj) {

                $scope.auth = Auth;
                console.log('login Auth');
                console.log($scope.auth);
                $scope.currentAuth = currentAuth;
                console.log('enter login');
                console.log(userObj);
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
                    console.log('in redirect');
                    console.log(result);
                    console.log(userObj);
                    if (result.credential && result.user && !userObj.$value)
                    {
                        var user = {
                            email: result.additionalUserInfo.profile.email,
                            first_name: result.additionalUserInfo.profile.first_name,
                            last_name: result.additionalUserInfo.profile.last_name,
                            gender: result.additionalUserInfo.profile.gender,
                            face_link: result.additionalUserInfo.profile.link,
                            picture: result.additionalUserInfo.profile.picture.data.url,
                            created: Date.now()
                        };
                        var ref = firebase.database().ref().child('users').child(result.user.uid);
                        ref.set(user);
//                    USERS.AddUser(user, result.user.uid);          // save user basic profile on DB
                        console.log('after save ');
                        console.log(userObj);
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

                        if (userObj && userObj.email)
                        {
                            if (userObj.phone)
                                $state.go('main');                   // send user to profile because everything is good and stored
                            else
                            {
                                $state.go('phone');                     // send user to auth phone incase phone not stored on DB
                                console.log(USERS.getUser());
                            }
                        } else
                        {

//                            console.log(USERS.currentUser);
                            $state.go('phone');
                        }
                    }

                });
            }
    );
})();