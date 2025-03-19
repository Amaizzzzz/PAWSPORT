import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 从 Firebase Console 获取的配置信息
// 替换下面的值为你的实际配置
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // 从 Firebase Console 复制
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // 从 Firebase Console 复制
  projectId: "YOUR_PROJECT_ID", // 从 Firebase Console 复制
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // 从 Firebase Console 复制
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // 从 Firebase Console 复制
  appId: "YOUR_APP_ID" // 从 Firebase Console 复制
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }; 