const admin = require('firebase-admin');
const serviceAccount = require('./chairly-b1eed-firebase-adminsdk-uk68u-f0f50a6ae2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chairly-b1eed-default-rtdb.firebaseio.com/' 
});

const db = admin.database(); // For Realtime Database
module.exports = db;
