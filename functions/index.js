
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Keeps track of the length of the 'likes' child list in a separate property.
exports.user_registered_to_event = functions.database.ref('/UsersInEvent/{clubId}/{eventId}/{userId}').onWrite(event => {
    console.log('entered function');
    console.log(event.params.eventId);
    const root = event.data.ref.root;
    const events = root.child('events').child(event.params.clubId).child(event.params.eventId).child('panding');
    // Return the promise from countRef.transaction() so our function 
    // waits for this async event to complete before it exits.
    return events.transaction(current => {
        console.log('current : ' + current);
        console.log(event.data);
        console.log(event.data.exists());
        console.log(event.data.previous.exists());
        if (event.data.exists() && !event.data.previous.exists()) {
            return (current || 0) + 1;
        } else if (!event.data.exists() && event.data.previous.exists()) {
            return (current || 0) - 1;
        }
    }).then(() => {
        console.log('Counter updated.');
    });
});