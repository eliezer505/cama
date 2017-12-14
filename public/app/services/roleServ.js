(function () {

    angular.module('app').
            service("ROLES", function ( Auth, $q) {
                if (Auth) {
                    var rolesRef = firebase.database().ref('roles');

                    this.getClubesUserAssign = function (userId) {
                        var one = $q.defer();

                        rolesRef.child(userId).once("value", function (snapshot) {
                            one.resolve(snapshot.val());
                        });

                        return one.promise;
                    };
                }
            });
})(); 