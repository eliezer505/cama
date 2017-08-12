(function () {

    angular.module('app').
            service("ROLES", function ($firebaseObject, $firebaseArray, Auth,$q) {
                if (Auth) {

                    var rolesRef = firebase.database().ref('roles');
                    console.log(rolesRef);



                    this.getClubesUserAssign = function (userId) {
                        var one = $q.defer();
                        var roles = $firebaseObject(rolesRef.child(userId));

                        roles.$loaded().then(function () {

                            one.resolve(roles);

                        });

                        // Avner remmber that you didn't handle errores in load userr object. For later add catch

                        return one.promise;

//                         var root = firebase.database().ref('roles/'+userId);
//                        var Clubes = [];
//
//                        angular.forEach(clubes, function (club) {
//                            var ref = root.child(club.key);
//                             Clubes.push($firebaseObject(ref));
//                            console.log(club);
//                        });
//                   
//                        console.log(Clubes);
//                        
//                        
//                        var test = rolesRef.child(userId);
//                        var temp = $firebaseArray(test);
//                        console.log(temp);
//                        return temp;
                    };


                }

            });
})(); 