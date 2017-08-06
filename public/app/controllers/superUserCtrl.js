angular
        .module('app')
        .controller('superUserCtrl', function ($scope,$firebaseArray) {


            $scope.users = [];

            var UsersRef = firebase.database().ref('users');

            $scope.updateUsers = function (searchText) {
                console.log('snapshot');
                var query = UsersRef.orderByChild('phone').startAt(searchText).once('value', function(snap) {
       console.log('accounts matching email address', snap.val());
    });
    
      console.log(query);
                
                
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
      