import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração oficial do Firebase para o John Dev's Web
const firebaseConfig = {
  apiKey: "AIzaSyAaApPl8vZGX0L7kBhsgfFDKoomj0dYT6E",
  authDomain: "device-streaming-df4eb64c.firebaseapp.com",
  projectId: "device-streaming-df4eb64c",
  storageBucket: "device-streaming-df4eb64c.firebasestorage.app",
  messagingSenderId: "1013732121922",
  appId: "1:1013732121922:web:d3092d3e05bcb8a0cdfcdb"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
