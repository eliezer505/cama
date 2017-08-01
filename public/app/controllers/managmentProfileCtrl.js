angular
        .module('app')
        .controller('managmentProfileCtrl', function ($scope) {




            $scope.clubPicture = "img/empty-club.jpg";


            $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                    'WY').split(' ').map(function (state) {
                return {abbrev: state};
            });


            // used for upload the file to firebase           
            $scope.upload_image = function (image) {
                if (!image.valid)
                    return;

                var imagesRef, safename, imageUpload;

                image.isUploading = true;
                imageUpload = {
                    isUploading: true,
                    data: image.data,
                    thumbnail: image.thumbnail,
                    name: image.filename,
                    author: {
                        provider: $scope.auth.user.provider,
                        id: $scope.auth.user.id
                    }
                };

                safename = imageUpload.name.replace(/\.|\#|\$|\[|\]|-|\//g, "");
                imagesRef = new Firebase($scope.firebaseUrl + '/images');

                imagesRef.child(safename).set(imageUpload, function (err) {
                    if (!err) {
                        imagesRef.child(safename).child('isUploading').remove();
                        $scope.$apply(function () {
                            $scope.status = 'Your image "' + image.filename + '" has been successfully uploaded!';
                            if ($scope.uploaded_callback !== undefined) {
                                $scope.uploaded_callback(angular.copy(imageUpload));
                            }
                            image.isUploading = false;
                            image.data = undefined;
                            image.filename = undefined;
                        });
                    } else {
                        $scope.error = 'There was an error while uploading your image: ' + err;
                    }
                });
            };


        });
      