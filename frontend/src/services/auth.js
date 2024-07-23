import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function signup(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, 'users', user.uid), {
    username,
    email,
  });
}

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log('User logged in:', userCredential.user.email);
  return userCredential.user;

}

export async function logout() {
  return signOut(auth);
}
