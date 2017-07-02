(function () {

    angular.module('app').controller("loginCtrl",
            function ($scope, Auth, $state, currentAuth, USERS, userObj) {

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
                    if (result.credential && result.user && !userObj.email)
                    {

                        userObj.email = result.additionalUserInfo.profile.email;
                        userObj.first_name = result.additionalUserInfo.profile.first_name;
                        userObj.last_name = result.additionalUserInfo.profile.last_name;
                        userObj.gender = result.additionalUserInfo.profile.gender;
                        userObj.face_link = result.additionalUserInfo.profile.link;
                        userObj.picture = result.additionalUserInfo.profile.picture.data.url;
                        userObj.created = Date.now()

                        userObj.$save();
//                    USERS.AddUser(user, result.user.uid);          // save user basic profile on DB

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

                Auth.$onAuthStateChanged(function (authData) {
                    if (authData)
                    {

                        if (userObj && userObj.email)
                        {
                            if (userObj.phone)
                                $state.go('clubears.main.clubes');                   // send user to profile because everything is good and stored
                            else
                            {
                                $state.go('phone');                     // send user to auth phone incase phone not stored on DB
                                //    console.log(USERS.getUser());
                            }
                        }
                    } else
                    {

//                            console.log(USERS.currentUser);
                        $state.go('login');
                    }

                });
            }
    );
})();