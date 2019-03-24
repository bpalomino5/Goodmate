import { db, auth } from './firebase';

/**
  |--------------------------------------------------
  | Reference Functions
  |--------------------------------------------------
  */

export const getGroupName = async () => {
  const ref = await getGroupRef();
  return ref ? ref.id : '';
};

const getGroupRef = async () => {
  try {
    const response = await db
      .collection('users')
      .doc(auth.currentUser.uid)
      .get();
    return response.get('groupRef');
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRoommates = async () => {
  try {
    const ref = await getGroupRef();
    const users = [];

    if (ref) {
      const rquery = await ref.collection('roommates').get();
      if (rquery) {
        await Promise.all(
          rquery.docs.map(async doc => {
            const ruid = doc.get('roommate');
            const user = await db
              .collection('users')
              .doc(ruid)
              .get();

            users.push({
              ...user.data(),
              uid: user.id,
            });
          }),
        );
      }
    }
    return users;
  } catch (error) {
    return null;
  }
};

/**
  |--------------------------------------------------
  | Reminder Functions
  |--------------------------------------------------
  */

export const removeReminder = async rid => {
  const ref = await getGroupRef();
  if (ref) {
    await ref
      .collection('reminders')
      .doc(rid)
      .delete();
  }
};

export const addReminder = async (reminder, rid) => {
  const ref = await getGroupRef();
  if (ref) {
    const docSnapshot = await ref
      .collection('reminders')
      .doc(rid)
      .get();
    if (docSnapshot.exists) {
      docSnapshot.ref.update({ ...reminder, created_by: auth.currentUser.uid });
    } else {
      await ref.collection('reminders').add({ ...reminder, created_by: auth.currentUser.uid });
    }
  }
};

const splitDateString = date => {
  let [month, day, year] = date.split('/');
  month = parseInt(month, 10) - 1;
  day = parseInt(day, 10);
  year = parseInt(year, 10);

  return [month, day, year];
};

const convertTime12to24 = time12h => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return [hours, minutes];
};

const checkExpired = async reminders => {
  const currentDate = new Date();
  const checked = reminders.filter(async reminder => {
    const [month, day, year] = splitDateString(reminder.date);
    const [hours, minutes] = convertTime12to24(reminder.time);
    const reminderDate = new Date(year, month, day, hours, minutes);
    if (reminderDate >= currentDate) {
      return reminder;
    }
    await removeReminder(reminder.rid);
  });
  return checked;
};

export const getReminders = async () => {
  let reminders = [];
  const ref = await getGroupRef();
  if (ref) {
    const query = await ref.collection('reminders').get();
    query.forEach(doc => {
      reminders.push({
        ...doc.data(),
        rid: doc.id,
      });
    });
  }
  reminders = await checkExpired(reminders);
  return reminders;
};

/**
  |--------------------------------------------------
  | Home Functions
  |--------------------------------------------------
  */

export const removeActivity = async aid => {
  const ref = await getGroupRef();
  if (ref) {
    await ref
      .collection('activities')
      .doc(aid)
      .delete();
  }
};

export const addActivity = async activity => {
  const ref = await getGroupRef();
  if (ref) {
    await ref.collection('activities').add({ ...activity, created_by: auth.currentUser.uid });
  }
};

export const addLikeToActivity = async aid => {
  const ref = await getGroupRef();
  if (ref) {
    const docSnapshot = await ref
      .collection('activities')
      .doc(aid)
      .get();

    let likes = 0;
    likes = docSnapshot.get('likes');
    await docSnapshot.ref.update({
      likes: likes + 1,
    });
  }
};

export const getActivities = async () => {
  const activities = [];
  const ref = await getGroupRef();
  if (ref) {
    const query = await ref
      .collection('activities')
      .orderBy('time', 'desc')
      .get();

    query.forEach(doc => {
      activities.push({ ...doc.data(), key: doc.id });
    });
  }
  return activities;
};

/**
  |--------------------------------------------------
  | Settings Functions
  |--------------------------------------------------
  */

export const submitSuggestion = description => db.collection('feedback').add({ description });

export const DeleteGroup = async name => {
  let success = false;
  const doc = await db
    .collection('groups')
    .doc(name)
    .get();

  if (doc.exists) {
    // get rids from roommates collection of group
    const ref = await getGroupRef();
    const rids = [];
    if (ref) {
      const querySnapshot = await ref.collection('roommates').get();
      querySnapshot.forEach(rdoc => {
        rids.push(rdoc.get('roommate'));
      });
    }

    // remove groupRef from each user
    await Promise.all(
      rids.map(async rid => {
        await removeRoommate(rid);
      }),
    );

    // delete group
    await doc.ref.delete();
    success = true;
  }
  return success;
};

export const removeUserFromGroup = async name => {
  let success = false;
  const doc = await db
    .collection('groups')
    .doc(name)
    .get();

  if (doc.exists) {
    await removeRoommate(auth.currentUser.uid);
    success = true;
  }
  return success;
};

export const createUser = async () => {
  await db
    .collection('users')
    .doc(auth.currentUser.uid)
    .set({
      name: auth.currentUser.displayName,
      primary: false,
      groupRef: null,
    });
};

export const addUsertoGroup = async name => {
  let success = false;
  const doc = await db
    .collection('groups')
    .doc(name)
    .get();

  if (doc.exists) {
    // add groupRef to user doc
    await db
      .collection('users')
      .doc(auth.currentUser.uid)
      .update({ groupRef: doc.ref, primary: false });

    // add to roommates collections in group
    await doc.ref.collection('roommates').add({
      roommate: auth.currentUser.uid,
    });
    success = true;
  }
  return success;
};

export const createGroup = async name => {
  let success = false;
  const doc = await db
    .collection('groups')
    .doc(name)
    .get();

  if (!doc.exists) {
    // create group
    doc.ref.set();
    success = await addUsertoGroup(name);

    // update to primary user
    await db
      .collection('users')
      .doc(auth.currentUser.uid)
      .update({ primary: true });
  }
  return success;
};

export const removeRoommate = async rid => {
  // remove from roommates collection under group
  const ref = await getGroupRef();
  if (ref) {
    const querySnapshot = await ref.collection('roommates').get();
    querySnapshot.forEach(doc => {
      if (doc.get('roommate') === rid) {
        doc.ref.delete();
      }
    });
  }

  // remove groupRef from users doc
  await db
    .collection('users')
    .doc(rid)
    .update({ groupRef: null });
};

export const updatePrimary = async rid => {
  await db
    .collection('users')
    .doc(auth.currentUser.uid)
    .update({ primary: false });

  await db
    .collection('users')
    .doc(rid)
    .update({ primary: true });
};

export const updateUserName = async name => {
  await db
    .collection('users')
    .doc(auth.currentUser.uid)
    .update({ name });
};

/**
  |--------------------------------------------------
  | Rent Functions
  |--------------------------------------------------
  */

export const getRent = async (month, year) => {
  try {
    let rentSheet = null;
    const ref = await getGroupRef();
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
};

export const submitRent = async rentSheet => {
  const sheetRef = await getRent(rentSheet.date.month, rentSheet.date.year);
  if (sheetRef) {
    sheetRef.ref.set(rentSheet);
  } else {
    const ref = await getGroupRef();
    if (ref) {
      await ref.collection('rents').add(rentSheet);
    }
  }
};
