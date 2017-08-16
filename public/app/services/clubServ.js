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
                        clubObj.address = {placeId: "", streetNumber: "", street: "", city: "", state: "", countryCode: "", country: ""};
                        clubObj.location = {lat: "", long: ""};

                        var newClub = clubRef.push(clubObj);
                        return newClub;

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
                        var one = $q.defer();
                        var club = $firebaseObject(ClubesRef.child(clubKey));

                        club.$loaded().then(function () {
                            one.resolve(club);
                        });
                        // Avner remmber that you didn't handle errores in load userr object. For later add catch
                        return one.promise;
                    };

                }
                ;

            });
})(); 