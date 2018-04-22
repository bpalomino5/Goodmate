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
