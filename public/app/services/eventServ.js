(function () {

    angular.module('app').
            service("EVENTS", function ($firebaseObject, Auth, $infiniteScroll) {
                if (Auth) {

                    var EventsRef = firebase.database().ref('events');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.AddEvent = function (Event, clubId) {

                        var root = firebase.database().ref();
                        var eventRef = root.child('events');
                        var clubRef = eventRef.child(clubId);
                        var newEvent = clubRef.push();
                        newEvent.set(Event);
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
                }
                ;


            });
})(); 