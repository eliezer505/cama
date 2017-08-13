(function () {

    angular.module('app').
            service("CLUBES", function ($firebaseObject, $firebaseArray, Auth, $q) {
                if (Auth) {

                    var ClubesRef = firebase.database().ref('clubes');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.AddClub = function (club) {
                        var root = firebase.database().ref();
                        var clubRef = root.child('clubes');
                        var newClub = clubRef.push();
                        newClub.set(club);

                    };

                    this.getClubesUserAssign = function (clubes) {

                        var Clubes = [];
                        angular.forEach(clubes, function (value, key) {
                            var ref = $firebaseObject(ClubesRef.child(key)).$loaded();
                            Clubes.push(ref);
                        });

                        return $q.all(Clubes);
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

                            status = 'Your image "' + image2.file.name + '" has been successfully uploaded!';

                            clubPicture = image2.dataURL;
                            image2.file = undefined;
                            image2.url = undefined;
                            image2.dataURL = undefined;
                            image2.resized.dataURL = undefined;
                            image2.resized.type = undefined;



                        }), function (error) {
                            error = 'There was an error while uploading your image: ' + error;
                            console.log(error);
                        };
                    }
                    ;
                }
                ;
            });
})(); 