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

  async submitSuggestion(description) {
    const feedbackRef = await firebase.firestore().collection('feedback');
    await feedbackRef.add({ description });
  }

  async DeleteGroup(name) {
    let success = false;
    const doc = await firebase
      .firestore()
      .collection('groups')
      .doc(name)
      .get();

    if (doc.exists) {
      // get rids from roommates collection of group
      const ref = await this.getGroupRef();
      const rids = [];
      if (ref) {
        const querySnapshot = await ref.collection('roommates').get();
        querySnapshot.forEach(rdoc => {
          rids.push(rdoc.get('roommate'));
        });
      }

      // remove groupRef from each user
      await Promise.all(rids.map(async rid => {
        await this.removeRoommate(rid);
      }));

      // delete group
      await doc.ref.delete();
      success = true;
    }
    return success;
  }

  async removeUserFromGroup(name) {
    let success = false;
    const doc = await firebase
      .firestore()
      .collection('groups')
      .doc(name)
      .get();

    if (doc.exists) {
      await this.removeRoommate(this.user.uid);
      success = true;
    }
    return success;
  }

  async addUsertoGroup(name) {
    let success = false;
    const doc = await firebase
      .firestore()
      .collection('groups')
      .doc(name)
      .get();

    if (doc.exists) {
      // add groupRef to user doc
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid);
      userRef.update({ groupRef: doc.ref });

      // add to roommates collections in group
      const roommatesRef = doc.ref.collection('roommates');
      roommatesRef.add({
        roommate: this.user.uid,
      });
      success = true;
    }
    return success;
  }

  async removeRoommate(rid) {
    // remove from roommates collection under group
    const ref = await this.getGroupRef();
    if (ref) {
      const querySnapshot = await ref.collection('roommates').get();
      querySnapshot.forEach(doc => {
        if (doc.get('roommate') === rid) {
          doc.ref.delete();
        }
      });
    }

    // remove groupRef from users doc
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(rid);
    userRef.update({ groupRef: null });
  }

  async updatePrimary(rid) {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(this.user.uid);
    userRef.update({ primary: false });

    const otherRef = firebase
      .firestore()
      .collection('users')
      .doc(rid);
    otherRef.update({ primary: true });
  }

  async updatePassword(password) {
    await this.user.updatePassword(password);
  }

  async loginWithEmail(email, password) {
    try {
      const cred = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
      return cred;
    } catch (error) {
      // console.log(error.code, error.message);
      return null;
    }
  }

  getCredential(password) {
    const credential = firebase.auth.EmailAuthProvider.credential({
      email: this.user.email,
      password,
    });
    return credential;
  }

  async getUserRef() {
    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(this.user.uid)
      .get();
    return userDoc;
  }

  async updateUserName(name) {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(this.user.uid);
    userRef.update({ first: name });
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

  async getReminder(rid) {
    try {
      let rem = null;
      const ref = await this.getGroupRef();
      if (ref) {
        const querySnapshot = await ref.collection('reminders').get();
        querySnapshot.forEach(doc => {
          if (doc.id === rid) {
            rem = doc;
          }
        });
      }
      return rem;
    } catch (error) {
      return null;
    }
  }

  async addReminder(reminder, rid) {
    const reminderRef = await this.getReminder(rid);
    if (reminderRef) {
      reminderRef.ref.set(reminder);
    } else {
      const ref = await this.getGroupRef();
      if (ref) {
        ref.collection('reminders').add(reminder);
      }
    }
  }

  async getReminders() {
    const reminders = [];
    const ref = await this.getGroupRef();
    if (ref) {
      const query = await ref.collection('reminders').get();
      query.forEach(doc => {
        reminders.push({
          title: doc.get('title'),
          type: doc.get('type'),
          date: doc.get('date'),
          time: doc.get('time'),
          rid: doc.id,
        });
      });
    }
    return reminders;
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
    try {
      const ref = await this.getGroupRef();
      const users = [];
      if (ref) {
        const rquery = await ref.collection('roommates').get();
        if (rquery) {
          await Promise.all(rquery.docs.map(async doc => {
            const uid = doc.get('roommate');
            const user = await firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .get();

            users.push({
              first: user.get('first'),
              last: user.get('last'),
              primary: user.get('primary'),
              uid: user.id,
            });
          }));
        }
      }
      return users;
    } catch (error) {
      return null;
    }
  }
}

export default new FireTools();
