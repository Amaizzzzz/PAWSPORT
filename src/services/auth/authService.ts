import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';

// Register a new user
export const registerUser = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's profile
    await updateProfile(user, { displayName });
    
    // Create a user document in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email,
      displayName,
      createdAt: new Date().toISOString(),
      pets: [],
      travelHistory: []
    });
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 