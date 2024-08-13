// firebase-config.js
const admin = require('firebase-admin');

// Replace with the path to your Firebase service account key JSON file
const serviceAccount = require('./chairly-b1eed-firebase-adminsdk-uk68u-f0f50a6ae2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chairly-b1eed-default-rtdb.firebaseio.com/"
});

const database = admin.database();

module.exports = database;
