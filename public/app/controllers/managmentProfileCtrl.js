angular
        .module('app')
        .controller('managmentProfileCtrl', function ($scope) {

            $scope.image2 = {};
            $scope.clubPicture = "img/empty-club.jpg";

            $scope.address = {};
            $scope.address.name = "";
            $scope.address.components = {placeId: "", streetNumber: "", street: "", city: "", state: "", countryCode: "", country: "", postCode: ""};

            $scope.address.components.location = {lat: "", long: ""};

            $scope.check = function () {
                console.log($scope.address);


            };

            $scope.$watch('image2', function () {
                if ($scope.image2.resized && $scope.image2.resized.dataURL) {

                    console.log($scope.image2);
                    $scope.clubPicture = $scope.image2.resized.dataURL;
                    $scope.$apply();
                } else
                    console.log('in');
                $scope.clubPicture = "img/empty-club.jpg";
            });
//            $scope.firebaseUrl = firebase.storage().ref('clubes');
            // used for upload the file to firebase           
            $scope.upload_image = function (image2) {

                var imagesRef;

                imagesRef = firebase.storage().ref('clubes/' + image2.file.name.replace(/\|\#|\$|\[|\]||\//g, ""));
//                console.log(imagesRef);
//
//
                imagesRef.putString(image2.resized.dataURL, 'data_url').then(function (snapshot) {
                    $scope.$apply(function () {
                        $scope.status = 'Your image "' + image2.file.name + '" has been successfully uploaded!';
                        console.log($scope.status);
                        $scope.clubPicture = image2.dataURL;
                        image2.file = undefined;
                        image2.url = undefined;
                        image2.dataURL = undefined;
                        image2.resized.dataURL = undefined;
                        image2.resized.type = undefined;

                    });


                }), function (error) {
                    $scope.error = 'There was an error while uploading your image: ' + error;
                    console.log($scope.error);
                };

            };


        });
      