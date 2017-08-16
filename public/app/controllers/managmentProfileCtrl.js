angular
        .module('app')
        .controller('managmentProfileCtrl', function ($scope, $timeout, $clubToast, $state, $stateParams, currentClub) {
            console.log(currentClub);
            $scope.club = currentClub;

            $scope.image2 = {};
            $scope.check = function () {
                console.log($scope.club.address);
            };

            $scope.updateClub = function () {
                console.log($scope.clubForm.$valid);
                if ($scope.clubForm.$valid) {
                    $scope.upload = true;
                    if (angular.equals($scope.image2, {})) {
                        $scope.club.active = true;
                        var cTime = new Date();
                        $scope.club.open = cTime.getTime();
                        $scope.club.$save().then(function () {
                            $clubToast.show('פרופיל המועדון עודכן', 'clubProfile', 'success');
                        }, function (error) {
                            $clubToast.show('חלה שגיאה בעדכון!', 'clubProfile', 'error');
                            console.log(error);
                        });
                    } else {

                        var imagesRef = firebase.storage().ref('clubes/' + $scope.club.$id + '/profile/profile.jpg');
                        imagesRef.putString($scope.image2.resized.dataURL, 'data_url').then(function (snapshot) {

                            $scope.club.clubPicture = snapshot.metadata.downloadURLs[0];
                            $scope.club.active = true;
                            var cTime = new Date();
                            $scope.club.open = cTime.getTime();
                            $scope.club.$save().then(function () {
                                $clubToast.show('פרופיל המועדון עודכן', 'clubProfile', 'success');
                            }, function (error) {
                                $clubToast.show('חלה שגיאה בעדכון!', 'clubProfile', 'error');
                                console.log(error);
                            });
                            $scope.image2.file = undefined;
                            $scope.image2.url = undefined;
                            $scope.image2.dataURL = undefined;
                            $scope.image2.resized.dataURL = undefined;
                            $scope.image2.resized.type = undefined;

                        }), function (error) {
                            $clubToast.show('חלה שגיאה בהעלאת התמונה!', 'clubProfile', 'error');
                            console.log(error);
                        };
                    }
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

            $scope.$watch('club.address.city', function () {
                $timeout(function () {
                    $scope.clubForm.address.$setValidity("city", $scope.club.address.city !== undefined && $scope.club.address.city !== "");
                    $scope.$apply();
                });
            });

            $scope.$watch('club.address.street', function () {
                $timeout(function () {
                    $scope.clubForm.address.$setValidity("street", $scope.club.address.street !== undefined && $scope.club.address.street !== "");
                    $scope.$apply();
                });
            });

            $scope.$watch('club.address.country', function () {
                $timeout(function () {
                    $scope.clubForm.address.$setValidity("country", $scope.club.address.country !== undefined && $scope.club.address.country !== "");
                    $scope.$apply();
                });
            });

            $scope.$watch('club.address.streetNumber', function () {
                $timeout(function () {
                    $scope.clubForm.address.$setValidity("streetNumber", $scope.club.address.streetNumber !== undefined && $scope.club.address.streetNumber !== "");
                    $scope.$apply();
                });
            });

            $scope.goParties = function () {
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});
            };

            $scope.goProfile = function () {
                $state.go('managment.profile', {clubId: $stateParams.clubId, role: $stateParams.role});
            };
        });
