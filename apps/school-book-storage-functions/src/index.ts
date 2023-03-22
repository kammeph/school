// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Firebase Features from within Cloud Functions.
import * as admin from 'firebase-admin';
import {
  Book,
  BooksInSchoolClass,
  BooksInStorage,
  SchoolClass,
  Storage,
} from '@school-book-storage/shared-models';

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

export const userDeleted = schoolFunctions.firestore
  .document('users/{userId}')
  .onDelete((snap, context) => {
    functions.logger.log('User deleted', { userId: context.params.userId });
    return admin.auth().deleteUser(context.params.userId);
  });

export const booksInStorageWrite = schoolFunctions.firestore
  .document('schools/{schoolId}/books-in-storage/{booksInStorageId}')
  .onWrite(async (snap, context) => {
    const newValue = BooksInStorage.parse(snap.after.data());
    return updateBoosInStorage(context.params.schoolId, newValue);
  });

export const booksInStorageDelete = schoolFunctions.firestore
  .document('schools/{schoolId}/books-in-storage/{booksInStorageId}')
  .onDelete(async (snap, context) => {
    const deletedValue = BooksInStorage.parse(snap.data());
    return updateBoosInStorage(context.params.schoolId, deletedValue, true);
  });

export const booksInSchoolClassWrite = schoolFunctions.firestore
  .document('schools/{schoolId}/books-in-school-class/{booksInSchoolClassId}')
  .onWrite(async (snap, context) => {
    const newValue = BooksInSchoolClass.parse(snap.after.data());
    return updateBooksInSchoolClass(context.params.schoolId, newValue);
  });

export const booksInSchoolClassDelete = schoolFunctions.firestore
  .document('schools/{schoolId}/books-in-school-class/{booksInSchoolClassId}')
  .onDelete(async (snap, context) => {
    const deletedValue = BooksInSchoolClass.parse(snap.data());
    return updateBooksInSchoolClass(
      context.params.schoolId,
      deletedValue,
      true
    );
  });

const updateBoosInStorage = async (
  schoolId: string,
  booksInStorage: BooksInStorage,
  remove?: boolean
) => {
  const storage$ = admin
    .firestore()
    .doc(`schools/${schoolId}/storages/${booksInStorage.storageId}`)
    .get()
    .then((doc) => Storage.parse(doc.data()));

  const book$ = admin
    .firestore()
    .doc(`schools/${schoolId}/books/${booksInStorage.bookId}`)
    .get()
    .then((doc) => Book.parse(doc.data()));

  const [storage, book] = await Promise.all([storage$, book$]);

  const storages = (book?.storages ?? []).filter(
    (s) => s.id !== booksInStorage.storageId
  );
  if (!remove) {
    storages.push({
      id: booksInStorage.storageId,
      name: storage.name,
      count: booksInStorage.count,
    });
  }
  const totalCount =
    book?.schoolClasses?.reduce((total, s) => (total += s.count), 0) +
    storages?.reduce((total, s) => (total += s.count), 0);
  const setBookStorages$ = admin
    .firestore()
    .doc(`schools/${schoolId}/books/${booksInStorage.bookId}`)
    .set({ totalCount, storages }, { merge: true });

  const books = (storage?.books ?? []).filter(
    (b) => b.id !== booksInStorage.bookId
  );
  if (!remove) {
    books.push({
      id: booksInStorage.bookId,
      name: book.name,
      count: booksInStorage.count,
    });
  }
  const setStorageBooks$ = admin
    .firestore()
    .doc(`schools/${schoolId}/storages/${booksInStorage.storageId}`)
    .set(
      { totalCount: books?.reduce((total, b) => (total += b.count), 0), books },
      { merge: true }
    );

  return Promise.all([setBookStorages$, setStorageBooks$]);
};

const updateBooksInSchoolClass = async (
  schoolId: string,
  booksInSchoolClass: BooksInSchoolClass,
  remove?: boolean
) => {
  const schoolClass$ = admin
    .firestore()
    .doc(
      `schools/${schoolId}/school-classes/${booksInSchoolClass.schoolClassId}`
    )
    .get()
    .then((doc) => SchoolClass.parse(doc.data()));

  const book$ = admin
    .firestore()
    .doc(`schools/${schoolId}/books/${booksInSchoolClass.bookId}`)
    .get()
    .then((doc) => Book.parse(doc.data()));

  const [schoolClass, book] = await Promise.all([schoolClass$, book$]);

  const schoolClasses = (book?.storages ?? []).filter(
    (s) => s.id !== booksInSchoolClass.schoolClassId
  );
  if (!remove) {
    schoolClasses.push({
      id: booksInSchoolClass.schoolClassId,
      name: `${schoolClass.grade}${schoolClass.letter}`,
      count: booksInSchoolClass.count,
    });
  }
  const totalCount =
    schoolClasses?.reduce((total, s) => (total += s.count), 0) +
    book?.storages?.reduce((total, s) => (total += s.count), 0);
  const setBookStorages$ = admin
    .firestore()
    .doc(`schools/${schoolId}/books/${booksInSchoolClass.bookId}`)
    .set({ totalCount, schoolClasses }, { merge: true });

  const books = (schoolClass?.books ?? []).filter(
    (b) => b.id !== booksInSchoolClass.bookId
  );
  if (!remove) {
    books.push({
      id: booksInSchoolClass.bookId,
      name: book.name,
      count: booksInSchoolClass.count,
    });
  }
  const setStorageBooks$ = admin
    .firestore()
    .doc(
      `schools/${schoolId}/school-classes/${booksInSchoolClass.schoolClassId}`
    )
    .set(
      { totalCount: books?.reduce((total, b) => (total += b.count), 0), books },
      { merge: true }
    );

  return Promise.all([setBookStorages$, setStorageBooks$]);
};
