angular
        .module('app')
        .controller('managmentProfileCtrl', function ($scope,$timeout,CLUBES) {

            $scope.club = {};
            
            $scope.image2 = {};
            $scope.clubPicture = "img/empty-club.jpg";

            $scope.club.address = {};
            $scope.club.address.name = "";
            $scope.club.address.components = {placeId: "", streetNumber: "", street: "", city: "", state: "", countryCode: "", country: "", postCode: ""};

            $scope.club.address.components.location = {lat: "", long: ""};

            $scope.check = function () {
                console.log($scope.club.address);


            };
            
            $scope.addNewClub = function (){
                $scope.upload = true;
                CLUBES.AddClub(club,image2);
                $scope.upload = false;
            };

            $scope.$watch('image2', function () {
                if ($scope.image2.resized && $scope.image2.resized.dataURL) {           
                    $timeout(function () {
                        $scope.clubPicture = $scope.image2.resized.dataURL;
                        // anything you want can go here and will safely be run on the next digest.
                    });
                } else
                    console.log('in');
                $scope.clubPicture = "img/empty-club.jpg";
            });



        });
      