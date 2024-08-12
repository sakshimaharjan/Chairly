const admin = require('firebase-admin');
const serviceAccount = require('./chairly-b7d16-firebase-adminsdk-akuo0-be0f914c99.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'hhttps://chairly-b7d16-default-rtdb.firebaseio.com/' 
});

const db = admin.database();
module.exports = db;
