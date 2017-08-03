(function () {

    angular.module('app').
            service("CLUBES", function ($firebaseObject, $firebaseArray, Auth,) {
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
                        currentDate.setHours(0,0,0,0);
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