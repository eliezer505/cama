angular
        .module('app')
        .controller('managmentProfileCtrl', function ($scope, $timeout, CLUBES, $state, $stateParams, currentClub) {
            console.log(currentClub);
            $scope.club = currentClub;

            $scope.image2 = {};
//            $scope.clubPicture = "img/empty-club.jpg";

//            $scope.club.address = {};
//            $scope.club.address.name = "";
//            $scope.club.address.components = {placeId: "", streetNumber: "", street: "", city: "", state: "", countryCode: "", country: "", postCode: ""};

//            $scope.club.address.components.location = {lat: "", long: ""};

            $scope.check = function () {
                console.log($scope.club.address);
            };

            $scope.updateClub = function () {
                console.log($scope.clubForm.$valid); 
                if ($scope.clubForm.$valid) {
                    $scope.upload = true;
                    console.log('in profile');
                    if (angular.equals($scope.image2, {})) {

                        $scope.club.$save();
                        console.log('if');
                    } else {
                        console.log('else');
                        var imagesRef = firebase.storage().ref('clubes/' + $scope.club.$id + '/profile/profile.jpg');
                        imagesRef.putString($scope.image2.resized.dataURL, 'data_url').then(function (snapshot) {

                            var status = 'Your image "' + $scope.image2.file.name + '" has been successfully uploaded!';
                            console.log(status);

                            $scope.club.clubPicture = snapshot.metadata.downloadURLs[0]
                            $scope.club.$save();
                            $scope.image2.file = undefined;
                            $scope.image2.url = undefined;
                            $scope.image2.dataURL = undefined;
                            $scope.image2.resized.dataURL = undefined;
                            $scope.image2.resized.type = undefined;

                        }), function (error) {
                            error = 'There was an error while uploading your image: ' + error;
                            console.log(error);
                        };
                    }


//                CLUBES.updateClub($scope.club,  $scope.image2);
                    $scope.upload = false;
                }
            };

            $scope.$watch('image2', function () {
                if ($scope.image2.resized && $scope.image2.resized.dataURL) {
                    $timeout(function () {
                        $scope.club.clubPicture = $scope.image2.resized.dataURL;
                        // anything you want can go here and will safely be run on the next digest.
                    });
                } else
                    $scope.clubPicture = "img/empty-club.jpg";
            });

            $scope.goParties = function () {
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});
            };

            $scope.goProfile = function () {
                $state.go('managment.profile', {clubId: $stateParams.clubId, role: $stateParams.role});
            };
        });
      