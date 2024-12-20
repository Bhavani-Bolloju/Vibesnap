import { createContext } from "react";

import { User } from "firebase/auth";

interface AuthContextProp {
  user: null | User;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProp>({
  user: null,
  loading: false
});

