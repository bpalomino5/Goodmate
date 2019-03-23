import { auth } from './firebase';

/**
  |--------------------------------------------------
  | Login Functions
  |--------------------------------------------------
  */

export const createUserWithEmail = async (email, password) => {
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    return cred;
  } catch (error) {
    return null;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred;
  } catch (error) {
    // console.log(error.code, error.message);
    return null;
  }
};

export const updatePassword = password => auth.currentUser.updatePassword(password);
export const updateUserName = name => auth.currentUser.updateProfile({ displayName: name });
export const resetPassword = email => auth.sendPasswordResetEmail(email);

export const isAuthUser = uid => auth.currentUser.uid === uid;
export const getDisplayName = () => auth.currentUser.displayName;
export const hasCurrentAuthUser = ids => ids.indexOf(auth.currentUser.uid) === 1;
