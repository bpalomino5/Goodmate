import firebase from 'react-native-firebase';

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
