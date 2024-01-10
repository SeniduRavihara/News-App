import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authContextType, currentUserType } from "../types";
import { INITIAL_AUTH_CONTEXT, INITIAL_CURRENT_USER } from "../constants";


export const AuthContext = createContext<authContextType>(INITIAL_AUTH_CONTEXT);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(INITIAL_CURRENT_USER);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        // localStorage.removeItem("token");
        // localStorage.removeItem("user");
        console.log("Auth state is changed: LoggedOut");
        // navigate("/login");
        return;
      }

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      console.log(user.email);
      console.log(user.uid);
      console.log(user.displayName);
      console.log(user.photoURL);

      // const token = await user.getIdToken();
      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));
      // navigate("/");
      console.log("Auth state is changed: loggedIn");
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const userData = {
          name: user.displayName || "",
          email: user.email || "",
          uid: user.uid,
          photoURL: user.photoURL || "",
        };

        await setDoc(userDocRef, userData);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };



  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        currentUser,
        setCurrentUser,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
