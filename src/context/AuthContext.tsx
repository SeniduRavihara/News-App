import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authContextType } from "../types";
import { INITIAL_AUTH_CONTEXT } from "../constants";
import { useNavigate } from "react-router-dom";

type currentUserType = null | {
  uid: string;
  email: string | null;
};

export const AuthContext = createContext<authContextType>(INITIAL_AUTH_CONTEXT);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>({
    uid: "",
    email: "",
  });

  // const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Auth state is changed: LoggedOut");
        // navigate("/login");
        return;
      }

      setCurrentUser({
        uid: user.uid,
        email: user.email,
      });
      console.log(user.email);
      console.log(user.uid);

      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
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
        };

        await setDoc(userDocRef, userData);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const payload = {
        likedPostIds: "",
      };

      await setDoc(doc(db, "users", user.uid), {
        ...payload,
        id: user.uid,
        name,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("LOGIN", userCredential);
    } catch (error) {
      console.log(error);
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
        signup,
        login,
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
