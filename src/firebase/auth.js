import { auth } from './firebase';

/**
  |--------------------------------------------------
  | Login Functions
  |--------------------------------------------------
  */

export const createUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);
export const signInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const updatePassword = password => auth.currentUser.updatePassword(password);
export const updateUserName = name => auth.currentUser.updateProfile({ displayName: name });
export const resetPassword = email => auth.sendPasswordResetEmail(email);

export const isAuthUser = uid => auth.currentUser.uid === uid;
export const getDisplayName = () => auth.currentUser.displayName;
export const hasCurrentAuthUser = ids => ids.indexOf(auth.currentUser.uid) !== -1;
