(function() {

	angular.module('app').service("EVENTS", function($firebaseObject, $firebaseArray, Auth, $q) {
		if (Auth) {
			//                    console.log(currentUser);
			//                    var user = Auth.$getAuth();
			//                    var userData = null;
			var EventsRef = firebase.database().ref('events');
			this.getEvent = function(Key) {
				//                        var UsersRef = firebase.database().ref('users');
				//                        if (!user || !user.uid)
				//                            return null;
				//                        if (!userData) {
				//
				//                            var UserRef = $firebaseObject(UsersRef.child(user.uid));
				//                            userData = UserRef.$loaded();
				//                        }
				var one = $q.defer();
				var event = $firebaseObject(EventsRef.child(Key));

				event.$loaded().then(function() {

					one.resolve(event);

				});

				// Avner remmber that you didn't handle errores in load userr object. For later add catch

				return one.promise;
			};

			this.AddEvent = function(Event) {
				console.log('add event');

				var root = firebase.database().ref();
				var eventRef = root.child('events');
				var newEvent= eventRef.push();
				newEvent.set(Event);

			};
			this.UpdateEvent = function(Event) {
				console.log('update event');
				Event.save();
				console.log(eventData);
			};
			this.DeleteEvent = function(EventKey) {
				var OneEventRef = EventRef.child(EventKey);
				OneEventRef.remove();
			};
			this.GetAllEvents = function() {
				return $firebaseArray(EventRef);
			};
			this.GetOneEvent = function(EventKey) {
				var OneItemRef = $firebaseObject(EventRef.child(EventKey));
				console.log(OneItemRef);
				return $firebaseObject(OneItemRef);
			};
		}
		;
		//                this.checkUser = function (UserKey) {

		//                    OneItemRef.once('value', function (snapshot) {                 // checks if user id already saved on DB
		//                        if (!snapshot.exists())
		//                            return false;
		//                        else
		//                            return true;
		//                    });
		//                };

		//                Auth.$onAuthStateChanged(function (authData) {
		//                    console.log('state changed');
		//
		//                });

	});
})(); 