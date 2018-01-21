
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// update the pending counter in event for all + male + female when user is signed in to event
exports.user_registered_to_event = functions.database.ref('/UsersInEvent/{clubId}/{eventId}/{userId}').onCreate(event => {
    const root = event.data.ref.root;
    const events = root.child('events').child(event.params.clubId).child(event.params.eventId).child('pending').child('all');

    return events.transaction(current => {
        return (current || 0) + 1;
    }).then(() => {
        var original = event.data.val();
        var gender = null;
        if (original.gender === "male") {
            gender = root.child('events').child(event.params.clubId).child(event.params.eventId).child('pending').child('male');
        } else if (original.gender === "female") {
            gender = root.child('events').child(event.params.clubId).child(event.params.eventId).child('pending').child('female');
        }
        return gender.transaction(current => {
            return (current || 0) + 1;
        });
    });
});


// update the pending counter in event for all + male + female when user is unsigned from event
exports.user_unregistered_to_event = functions.database.ref('/UsersInEvent/{clubId}/{eventId}/{userId}').onDelete(event => {
    const root = event.data.ref.root;
    const events = root.child('events').child(event.params.clubId).child(event.params.eventId).child('pending').child('all');

    return events.transaction(current => {
        return (current || 0) - 1;
    }).then(() => {
        var original = event.data.previous.val();

        const gender = root.child('events').child(event.params.clubId).child(event.params.eventId).child('pending').child(original.gender);

        return gender.transaction(current => {
            return (current || 0) - 1;
        });
    });
});

// update the approved counter in event for all + male + female when user has been approved to participate in event
exports.user_approved_to_event = functions.database.ref('/UsersInEvent/{clubId}/{eventId}/{userId}/sent').onUpdate(event => {

    const newVal = event.data.val();
    if (!newVal)
        return null;

    const root = event.data.ref.root;
    var original = root.child('UsersInEvent').child(event.params.clubId).child(event.params.eventId).child(event.params.userId);
    const events = root.child('events').child(event.params.clubId).child(event.params.eventId).child('approved').child('all');

    return events.transaction(current => {
        return (current || 0) + 1;
    }).then(() => {
        original.once("value", function (snapshot) {

            var user = snapshot.val();
            const gender = root.child('events').child(event.params.clubId).child(event.params.eventId).child('approved').child(user.gender);

            return gender.transaction(current => {
                return (current || 0) + 1;
            });
        });
    });
});