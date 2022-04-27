import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAUTVjtM2cNcdxbBPmmyTwhxjiIkRvJYz4',
  authDomain: 'netflix-clone-9809d.firebaseapp.com',
  projectId: 'netflix-clone-9809d',
  storageBucket: 'netflix-clone-9809d.appspot.com',
  messagingSenderId: '76007202921',
  appId: '1:76007202921:web:aab60989a7fb7f7a1682f8',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }
