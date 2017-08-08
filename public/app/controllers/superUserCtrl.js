angular
        .module('app')
        .controller('superUserCtrl', function ($scope, $q) {

            $scope.selectedItem = null;
            $scope.searchText = null;
            $scope.selectedUsers = [];

            var UsersRef = firebase.database().ref('users');

            $scope.check = function () {

                console.clear();
                console.log($scope.selectedUsers);


            };

            /**
             * Return the proper object when the append is called.
             */
            function transformChip(chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }

                // Otherwise, create a new one
                return {name: chip, type: 'new'}
            }


            function getUsers(searchText) {
                var one = $q.defer();
                var users = [];

                UsersRef
                        .orderByChild('phone')
                        .startAt(searchText)
                        .endAt(searchText + "\uf8ff")
                        .once('value', function (snapshot) {
                            snapshot.forEach(function (childSnapshot) {
                                users.push({"key": childSnapshot.key, "name": childSnapshot.val().first_name + " " + childSnapshot.val().last_name});
                            });
                            one.resolve(users);
                        });

                return one.promise;
            }

            $scope.updateUsers = function (searchText) {

                console.clear();

                var results = searchText ? getUsers(searchText) : [];
                return results;

            };


            $scope.openClub = function () {
                var root = firebase.database().ref();
                var clubesRef = root.child('clubes');
                 var newClub = clubesRef.push({"name":"חדש" , "active":true});
                 console.log (newClub.key);
                 console.log (newClub.val);
                
            };

        });
      