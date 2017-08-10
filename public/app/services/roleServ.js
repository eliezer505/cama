(function () {

    angular.module('app').
            service("ROLES", function ($firebaseObject, $firebaseArray, Auth) {
                if (Auth) {

                    var rolesRef = firebase.storage().ref('roles');
                    console.log(rolesRef);



                    this.getClubesUserAssign = function (userId) {
                        
                         var root = firebase.database().ref('clubes');
                        var Clubes = [];

                        angular.forEach(clubes, function (club) {
                            var ref = root.child(club.key);
                             Clubes.push($firebaseObject(ref));
                            console.log(club);
                        });
                   
                        console.log(Clubes);
                        
                        
                        var test = rolesRef.child(userId);
                        var temp = $firebaseArray(test);
                        console.log(temp);
                        return temp;
                    };


                }

            });
})(); 