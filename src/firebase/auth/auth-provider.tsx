import { AuthContext } from "./auth-context";

import React, { useState, ReactNode, useEffect } from "react";

import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "../config";

interface AuthContentProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthContentProviderProps> = function (props) {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listerner = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        setUser(user);
      } else {
        //user is signed out
        setUser(null);
      }

      setLoading(false);
    });

    return () => listerner();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
