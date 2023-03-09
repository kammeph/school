// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Firebase Features from within Cloud Functions.
import * as admin from 'firebase-admin';
admin.initializeApp();

// Set up extra settings. Since May 29, 2020, Firebase Firebase Added support for
// calling FirebaseFiresore.settings with { ignoreUndefinedProperties: true }.
// When this parameter is set, Cloud Firestore ignores undefined properties
// inside objects rather than rejecting the API call.
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const schoolFunctions = functions.region('europe-west1');

export const deleteUser = schoolFunctions.auth.user().onDelete((user) => {
  functions.logger.log('User deleted', user);
  return admin.firestore().collection('users').doc(user.uid).delete();
});

export const userUpdated = schoolFunctions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    functions.logger.log('User updated', { newValue, previousValue });
    return admin.auth().updateUser(context.params.userId, {
      displayName: newValue.displayName,
      disabled: !newValue.canLogin,
    });
  });

export const userCreated = schoolFunctions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    functions.logger.log('User created', { newValue });
    return admin.auth().updateUser(context.params.userId, {
      displayName: newValue.displayName,
      disabled: !newValue.canLogin,
    });
  });
