(function () {

    angular.module('app').
            service("EVENTS", function ($firebaseObject, $firebaseArray, Auth, $q,$infiniteScroll) {
                if (Auth) {

                    var EventsRef = firebase.database().ref('events');
                    var array = null;
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               

                    this.AddEvent = function (Event) {
                        var root = firebase.database().ref();
                        var eventRef = root.child('events');
                        var newEvent = eventRef.push();
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
                    this.GetFirstEvents = function () {
                        var currentDate = new Date();
                        currentDate.setHours(0,0,0,0);
                        var eventQuery = EventsRef.orderByChild("eDate").startAt(currentDate.getTime());
                        array = $infiniteScroll(eventQuery, 10);
                        return array;
                    };                    


//                    this.GetOneEvent = function (EventKey) {
//                        var OneItemRef = $firebaseObject(EventsRef.child(EventKey));
//                        console.log(OneItemRef);
//                        return $firebaseObject(OneItemRef);
//                    };
                }
                ;


            });
})(); 