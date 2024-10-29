import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up the onAuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Set to null if no user is logged in
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return { user };
};

export default AuthStatus;
