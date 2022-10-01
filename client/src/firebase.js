import { initializeApp } from 'firebase/app';
import { APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '../src/envValues';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: APIKEY,
	authDomain: AUTHDOMAIN,
	projectId: PROJECTID,
	storageBucket: STORAGEBUCKET,
	messagingSenderId: MESSAGINGSENDERID,
	appId: APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
