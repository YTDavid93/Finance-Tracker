import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../Firebase/Firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  return {
    user,
    loading,
    logOut
  };
};

export default useAuth;
