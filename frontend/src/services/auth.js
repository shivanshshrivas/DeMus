import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Signup function
export async function signup(email, password, username, walletAddress) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, 'users', user.uid), {
    username,
    email,
    walletAddress
  });
}

// Login function
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout function
export async function logout() {
  return signOut(auth);
}
