angular
        .module('app')
        .controller('superUserCtrl', function ($scope, $firebaseArray) {


            $scope.users = [];
            $scope.selectedItem = null;
            $scope.searchText = null;
          
            var UsersRef = firebase.database().ref('users');

            $scope.updateUsers = function (searchText) {
                console.clear();
                console.log(searchText);
                console.log('snapshot');
                var query = $firebaseArray(UsersRef
                        .orderByChild('phone')
                        .startAt(searchText)
                        .endAt(searchText + "\uf8ff"));
                
//                        .on('child_added', function (data) {
//                            $scope.users = data.val();
//                            console.log($scope.users);
//                        });

                //  console.log(query);


//                  var result = $firebaseArray(query).$loaded().then(function (res) {
//                      console.log(result);
//                      
//                  });
//                  
//                    result.$loaded().then(function () {





//                console.log('snapshot');
//                console.log(searchText);
//                var sync = $firebase();
//
//                console.log(sync);
            };

        });
      