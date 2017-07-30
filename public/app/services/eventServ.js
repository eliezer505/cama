(function () {

    angular.module('app').
            service("EVENTS", function ($firebaseObject, $firebaseArray, Auth, $q, $paginated) {
                if (Auth) {
                    //                    console.log(currentUser);
                    //                    var user = Auth.$getAuth();
                    //                    var userData = null;
                    var EventsRef = firebase.database().ref('events');
//                    		https://codepen.io/elliotmendiola/pen/JNYoNj	               
                    this.getEvent = function (Key) {
                        var one = $q.defer();
                        var event = $firebaseObject(EventsRef.child(Key));

                        event.$loaded().then(function () {

                            one.resolve(event);

                        });

                        // Avner remmber that you didn't handle errores in load userr object. For later add catch

                        return one.promise;
                    };

                    this.AddEvent = function (Event) {
                        console.log('add event');

                        var root = firebase.database().ref();
                        var eventRef = root.child('events');
                        var newEvent = eventRef.push();
                        newEvent.set(Event);

                    };
                    
                    this.UpdateEvent = function (Event) {
                        console.log('update event');
                        Event.save();
                        console.log(Event);
                    };
                    this.DeleteEvent = function (EventKey) {
                        var OneEventRef = EventsRef.child(EventKey);
                        OneEventRef.remove();
                    };
                    
                    this.GetFirstEvents = function () {
                        return pagination.getPaginator();
                    };                    
                    this.GetNextEvents = function () {
                        return pagination.next();
                    };
                    this.GetPrevEvents = function () {
                        return pagination.prev();
                    };


                    this.GetOneEvent = function (EventKey) {
                        var OneItemRef = $firebaseObject(EventsRef.child(EventKey));
                        console.log(OneItemRef);
                        return $firebaseObject(OneItemRef);
                    };
                }
                ;


            });
})(); 