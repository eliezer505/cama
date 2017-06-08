(function () {

    angular.module('app').service("USERS", ["$firebaseObject", "$firebaseArray", "Auth",
        function ($firebaseObject, $firebaseArray, Auth) {
            if (Auth) {
                var UserRef = firebase.database().ref().child('users');

                this.AddUser = function (User, Key) {
                    var OneUserRef = UserRef.child(Key);
                    OneUserRef.set(User);
                    return $firebaseObject(OneUserRef);
                };

                this.UpdateUser = function (User) {
                    var OneUserRef = UserRef.child(Key);
                    User.save();
                    return User;
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
        }

    ]);

})();