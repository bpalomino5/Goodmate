/* eslint class-methods-use-this: 0 */
import firebase from 'react-native-firebase';

class FireTools {
  constructor() {
    this.user = null;
  }

  init() {
    this.user = this.getUser();
  }

  // very important
  getUser() {
    return firebase.auth().currentUser;
  }

  async getGroupName() {
    const ref = await this.getGroupRef();
    return ref.id;
  }

  /**
  |--------------------------------------------------
  | Home Functions
  |--------------------------------------------------
  */

  async removeActivity(aid) {
    const ref = await this.getGroupRef();
    if (ref) {
      await ref
        .collection('activities')
        .doc(aid)
        .delete();
    }
  }

  async addActivity(activity) {
    const ref = await this.getGroupRef();
    if (ref) {
      ref.collection('activities').add(activity);
    }
  }

  async addLikeToActivity(aid) {
    const ref = await this.getGroupRef();
    if (ref) {
      const aDoc = await ref
        .collection('activities')
        .doc(aid)
        .get();
      let likes = 0;
      likes = aDoc.get('likes');
      aDoc.ref.update({
        likes: likes + 1,
      });
    }
  }

  async getActivities() {
    const activities = [];
    const ref = await this.getGroupRef();
    if (ref) {
      const query = await ref
        .collection('activities')
        .orderBy('time', 'desc')
        .get();
      query.forEach(doc => {
        const activity = doc.data();
        activity.key = doc.id;
        activities.push(activity);
      });
    }
    return activities;
  }

  /**
  |--------------------------------------------------
  | Settings Functions
  |--------------------------------------------------
  */
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
      userRef.update({ groupRef: doc.ref, primary: false });

      // add to roommates collections in group
      const roommatesRef = doc.ref.collection('roommates');
      roommatesRef.add({
        roommate: this.user.uid,
      });
      success = true;
    }
    return success;
  }

  async createGroup(name) {
    let success = false;
    const doc = await firebase
      .firestore()
      .collection('groups')
      .doc(name)
      .get();
    if (!doc.exists) {
      // create group
      doc.ref.set();
      success = await this.addUsertoGroup(name);

      // update to primary user
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid);
      userRef.update({ primary: true });
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

  async updateUserName(name) {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(this.user.uid);
    userRef.update({ first: name });
  }

  /**
  |--------------------------------------------------
  | Login Functions
  |--------------------------------------------------
  */

  async loginWithCred(credential) {
    try {
      const cred = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return cred;
    } catch (error) {
      return null;
    }
  }

  async createUserWithEmail(email, password) {
    try {
      const cred = await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      return cred;
    } catch (error) {
      return null;
    }
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

  // not being used right now
  getCredential(password) {
    const credential = firebase.auth.EmailAuthProvider.credential({
      email: this.user.email,
      password,
    });
    return credential;
  }

  /**
  |--------------------------------------------------
  | Reference Functions
  |--------------------------------------------------
  */
  // very important
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

  // not being used
  async getUserRef() {
    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(this.user.uid)
      .get();
    return userDoc;
  }

  /**
  |--------------------------------------------------
  | Reminder Functions
  |--------------------------------------------------
  */

  async removeReminder(rid) {
    const ref = await this.getGroupRef();
    if (ref) {
      await ref
        .collection('reminders')
        .doc(rid)
        .delete();
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
        await ref.collection('reminders').add(reminder);
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

  /**
  |--------------------------------------------------
  | Rent Functions
  |--------------------------------------------------
  */

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
}

export default new FireTools();
