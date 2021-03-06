(function () {

    angular.module('app').service("USERS",
            function ($firebaseObject, $firebaseArray, Auth, $q) {
                if (Auth) {

                    var UsersRef = firebase.database().ref('users');

                    this.getUser = function (Key) {
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
                    };

                    this.UpdateUser = function (User) {
                        User.save();

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

//                this.registerUser = function (clubKey, eventKey, User) {
//
//                    var root = firebase.database().ref();
//                    var regRef = root.child('registeration');
//
//                    var clubRef = regRef.child(clubKey);
//                    var eventRef = clubRef.child(eventKey);
//                    var userRef = eventRef.child(User.$id);
//                    
//                     var regDetails = {
//                            active: false,
//                            open: "",
//                            name: "חדש",
//                            reg: true,
//                            approved:"",
//                                                         
//                           
//                            photo: "img/empty-club.jpg"
//                           
//                        };
//                    
//                    var newEvent = clubRef.push();
//                    newEvent.set(Event);
//
//
//                    var OneItemRef = $firebaseObject(UserRef.child(UserKey));
//                    console.log(OneItemRef);
//                    return $firebaseObject(OneItemRef);
//                };


            });
})();