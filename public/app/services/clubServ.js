(function () {

    angular.module('app').
            service("CLUBES", function ($firebaseObject, $firebaseArray, Auth, $q) {
                if (Auth) {

                    var ClubesRef = firebase.database().ref('clubes');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.openClub = function () {
                        var root = firebase.database().ref();
                        var clubRef = root.child('clubes');
                        var clubObj = {
                            active: false,
                            open: "",
                            name: "חדש",
                            capacity: "",
                            address: {},
                            clubPicture: "img/empty-club.jpg",
                            description: null
                        };
                        clubObj.address.name = "";
                        clubObj.address = {placeId: "", streetNumber: "", street: "", city: "", state: "", countryCode: "", country: "", postCode: ""};
                        clubObj.location = {lat: "", long: ""};

                        var newClub = clubRef.push(clubObj);
                        return newClub;

                    };

                    this.updateClub = function (club, image2) {

                        console.log(club);
                        console.log(image2);
                        console.log('imagesRef');
                        console.log(imagesRef);
                        if (angular.equals(image2, {})) {
                            
                            club.$save();
                            console.log(club);
                        } else {

                            var imagesRef = firebase.storage().ref('clubes/' + club.$id + '/profile/profile.jpg');
                            imagesRef.putString(image2.resized.dataURL, 'data_url').then(function (snapshot) {

                                status = 'Your image "' + image2.file.name + '" has been successfully uploaded!';
                                console.log(snapshot);
//                            image2.file = undefined;
//                            image2.url = undefined;
//                            image2.dataURL = undefined;
//                            image2.resized.dataURL = undefined;
//                            image2.resized.type = undefined;
                                club.clubPicture = snapshot.metadata.downloadURLs[0]
                                club.$save();

                            }), function (error) {
                                error = 'There was an error while uploading your image: ' + error;
                                console.log(error);
                            };
                        }
                    };

                    this.getClubesUserAssign = function (clubes) {

                        var Clubes = [];
                        angular.forEach(clubes, function (value, key) {
                            var ref = $firebaseObject(ClubesRef.child(key)).$loaded();
                            Clubes.push(ref);
                        });

                        return $q.all(Clubes);
                    };



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

             
                }
                ;
            });
})(); 