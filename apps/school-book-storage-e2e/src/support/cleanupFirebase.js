var admin = require('firebase-admin');
var serviceAccount = require('../../../../serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

if (!process.env.email) console.log('no email provided');

admin
  .auth()
  .getUserByEmail(process.env.email)
  .then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    // console.log('Successfully fetched user data:', userRecord.toJSON())
    admin
      .auth()
      .deleteUser(userRecord.uid)
      .then(function () {
        console.log('Successfully deleted user');
        process.exit(0);
      })
      .catch(function (error) {
        console.log(error.code);
        process.exit(1);
      });
  })
  .catch(function (error) {
    if (error.code === 'auth/user-not-found') process.exit(0);
    console.log('Error fetching user data:', error);
    process.exit(1);
  });
