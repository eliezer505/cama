(function () {

    angular.module('app').service("USERS",
            function ($firebaseObject, $firebaseArray, Auth, $q) {
                if (Auth) {
//                    console.log(currentUser);
//                    var user = Auth.$getAuth();
//                    var userData = null;
                    var UsersRef = firebase.database().ref('users');
                    this.getUser = function (Key) {
//                        var UsersRef = firebase.database().ref('users');
//                        if (!user || !user.uid)
//                            return null;
//                        if (!userData) {
//
//                            var UserRef = $firebaseObject(UsersRef.child(user.uid));
//                            userData = UserRef.$loaded();
//                        }
                        var one = $q.defer();
                        var user = $firebaseObject(UsersRef.child(Key));

                        user.$loaded().then(function () {

                            one.resolve(user);

                        });
                        
                        // Avner remmber that you didn't handle errores in load userr object. For later add catch

                        return one.promise;
                    };

                    this.AddUser = function (User, Key) {
                        console.log('add user');
                        firebase.database().ref().child('users').child(Key).set(User);
//                        UserRef;
//
//                        userData = $firebaseObject(UserRef);
//                        userData.$loaded();
//                        console.log(userData);
                        //     userData = $firebaseObject(OneUserRef);
                    };
                    this.UpdateUser = function (User) {
                        console.log('update user');
                        User.save();
                        console.log(userData);
                    };
                    this.DeleteUser = function (UserKey) {
                        var OneUserRef = UserRef.child(UserKey);
                        OneUserRef.remove();
                    };
                    this.GetAllUsers = function () {
                        return $firebaseArray(UserRef);
                    };
                    this.GetOneUser = function (UserKey) {
                        var OneItemRef = $firebaseObject(UserRef.child(UserKey));
                        console.log(OneItemRef);
                        return $firebaseObject(OneItemRef);
                    };
                }
                ;
//                this.checkUser = function (UserKey) {


//                    OneItemRef.once('value', function (snapshot) {                 // checks if user id already saved on DB
//                        if (!snapshot.exists())
//                            return false;
//                        else
//                            return true;
//                    });
//                };

//                Auth.$onAuthStateChanged(function (authData) {
//                    console.log('state changed');
//
//                });

            });
})();