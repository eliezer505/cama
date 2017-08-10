(function () {

    angular.module('app').
            service("CLUBES", function ($firebaseObject, $firebaseArray, Auth, $scope) {
                if (Auth) {

                    var ClubesRef = firebase.storage().ref('clubes');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.AddClub = function (club) {
                        var root = firebase.database().ref();
                        var clubRef = root.child('clubes');
                        var newClub = clubRef.push();
                        newClub.set(club);

                    };

                    this.getClubesUserAssign = function (clubes) {
                        var root = firebase.database().ref('clubes');
                        var Clubes = [];

                        angular.forEach(clubes, function (club) {
                            var ref = root.child(club.key);
                             Clubes.push($firebaseObject(ref));
                            console.log(club);
                        });
                   
                        console.log(Clubes);

                    };


//                    this.UpdateEvent = function (Event) {
//                        console.log('update event');
//                        Event.save();
//                        console.log(Event);
//                    };
//                    this.DeleteEvent = function (EventKey) {
//                        var OneEventRef = EventsRef.child(EventKey);
//                        OneEventRef.remove();
//                    };
//                    

                    this.GetFirstEvents = function () {
                        var currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        var eventQuery = ClubesRef.orderByChild("eDate").startAt(currentDate.getTime());
                        array = $infiniteScroll(eventQuery, 10);
                        return array;
                    };


                    this.GetOneClub = function (clubKey) {
                        return $firebaseObject(ClubesRef.child(clubKey));
                    };




                    // used for upload the file to firebase           
                    function upload_image(image2) {

                        var imagesRef = firebase.storage().ref('clubes/profile.jpg');

                        imagesRef.putString(image2.resized.dataURL, 'data_url').then(function (snapshot) {
                            $scope.$apply(function () {
                                $scope.status = 'Your image "' + image2.file.name + '" has been successfully uploaded!';
                                console.log($scope.status);
                                console.log(snapshot);
                                console.log(snapshot.metadata.downloadURLs[0]);     // this is the link for picture
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

                    }
                    ;


                }
                ;


            });
})(); 