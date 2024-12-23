import { AuthContext } from "./auth-context";

import React, { useState, ReactNode, useEffect } from "react";

import { onAuthStateChanged, User } from "firebase/auth";

import { getAuth } from "firebase/auth";

interface AuthContentProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthContentProviderProps> = function (props) {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

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
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
