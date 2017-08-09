(function () {

    angular.module('app').
            service("ROLES", function ($firebaseObject, $firebaseArray, Auth) {
                if (Auth) {

                    var rolesRef = firebase.storage().ref('roles');
            

          

                    this.getClubesUserAssign = function (userId) {
                        return $firebaseArray(rolesRef.child(userId));
                    };


                }

            });
})(); 