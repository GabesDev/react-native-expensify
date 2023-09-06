import {initializeApp} from 'firebase/app';
import {getFirestore, collection} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAZAzAXr90OMVymgQD7GINAkasum_KNbYU',
  authDomain: 'react-native-expensify.firebaseapp.com',
  projectId: 'react-native-expensify',
  storageBucket: 'react-native-expensify.appspot.com',
  messagingSenderId: '120483290366',
  appId: '1:120483290366:web:9f19acf05e5ad94ea719af',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
