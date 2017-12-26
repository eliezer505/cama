(function () {

    angular.module('app').
            service("EVENTS", function ($firebaseObject, Auth, $infiniteScroll, $q, $firebaseArray) {
                if (Auth) {

                    var EventsRef = firebase.database().ref('events');
                    var EventsUsersRef = firebase.database().ref('UsersInEvent');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.AddEvent = function (Event, clubId) {

                        var root = firebase.database().ref();
                        var eventRef = root.child('events');
                        var clubRef = eventRef.child(clubId);
                        var newEvent = clubRef.push();
                        newEvent.set(Event);
                    };

                    this.GetFirstEvents = function (clubId) {
                        var currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        var clubRef = EventsRef.child(clubId);
                        var eventQuery = clubRef.orderByChild("eDate").startAt(currentDate.getTime());
                        array = $infiniteScroll(eventQuery, 10);
                        return array;
                    };


                    this.GetOneEvent = function (clubId, EventKey) {
                        var clubRef = EventsRef.child(clubId);
                        return $firebaseObject(clubRef.child(EventKey));
                    };

                    this.getClubEvents = function (clubId) {
                        console.log('in event');
                        console.log(clubId);
                        var one = $q.defer();
                        var events = $firebaseArray(EventsRef.child(clubId));

                        events.$loaded().then(function () {
                            one.resolve(events);
                        });
                        // Avner remmber that you didn't handle errores in load userr object. For later add catch
                        return one.promise;
                    };

                    this.addUserToEvent = function (eventId,clubId, userObj) {
                        // need to add check if user already signed in 
                        var user = {name: userObj.first_name + " " + userObj.last_name, picture: userObj.picture, gender: userObj.gender}
                        EventsUsersRef.child(clubId).child(eventId).child(userObj.$id).set(user);
//https://github.com/firebase/functions-samples/blob/master/child-count/functions/index.js
//add  function to make a counter
                    };

                }
                ;


            });
})(); 