/* eslint class-methods-use-this: 0 */
import firebase from 'react-native-firebase';

class FireTools {
  constructor() {
    this.user = null;
  }

  init() {
    this.user = this.getUser();
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  async getGroupRef() {
    try {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid)
        .get();
      return response.get('groupRef');
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getRent(month, year) {
    try {
      let rentSheet = null;
      const ref = await this.getGroupRef();
      if (ref) {
        const rentsSnapshot = await ref.collection('rents').get();
        rentsSnapshot.forEach(doc => {
          const date = doc.get('date');
          if (date.month === month && date.year === year) {
            rentSheet = doc;
          }
        });
      }
      return rentSheet;
    } catch (error) {
      return null;
    }
  }

  async submitRent(rentSheet) {
    const sheetRef = await this.getRent(rentSheet.date.month, rentSheet.date.year);
    if (sheetRef) {
      sheetRef.ref.set(rentSheet);
    } else {
      const ref = await this.getGroupRef();
      if (ref) {
        ref.collection('rents').add(rentSheet);
      }
    }
  }

  async getRoommates() {
    const query = await firebase
      .firestore()
      .collection('users')
      .get();

    const users = [];
    query.forEach(doc => {
      users.push({
        first: doc.get('first'),
        last: doc.get('last'),
        primary: doc.get('primary'),
        uid: doc.id,
      });
    });
    return users;
  }
}

export default new FireTools();
