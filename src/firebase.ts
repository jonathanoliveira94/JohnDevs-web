import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração oficial do Firebase Firestore
const firebaseConfig = {
  apiKey: "AIzaSyARMyRG7iAfBZ_71V4bZOLQ3ouHjlL1l3A",
  authDomain: "garagem-app-9a10d.firebaseapp.com",
  projectId: "garagem-app-9a10d",
  storageBucket: "garagem-app-9a10d.firebasestorage.app",
  messagingSenderId: "723611921155",
  appId: "1:723611921155:web:d87f54c93540280b135736"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
