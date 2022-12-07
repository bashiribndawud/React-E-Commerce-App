// Import the functions you need from the SDKs you need
import { display } from "@mui/system";
import { initializeApp } from "firebase/app";
// import { AuthContext } from "../context/context";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaqK2_xEcWV7vY0eTsXTaMlprgu_LOPCg",
  authDomain: "e-commerce-react-16b09.firebaseapp.com",
  projectId: "e-commerce-react-16b09",
  storageBucket: "e-commerce-react-16b09.appspot.com",
  messagingSenderId: "596036300028",
  appId: "1:596036300028:web:43e6c19932265531687b79",
  //   measurementId: "G-G0KT73TZTS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// createContext lets you create a context that components can provide or read.
const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

// custom hook
function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        setUser(user)
        return user
    });

  const signUserOut = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    
    return () => unsubscribe()
  }, [user])

  return {
    signIn,
    signUp,
    signUserOut,
    user,
  };
  
}


export default AuthProvider
