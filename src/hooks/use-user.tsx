import { useState, useEffect, useContext } from "react";
import { getUser } from "@/firebase/database/db-services";
import { UserDataProps } from "@/types";

import { AuthContext } from "@/firebase/auth/auth-context";

const useUser = function () {
  const [user, setUser] = useState<UserDataProps | null>(null);
  const auth = useContext(AuthContext);
  const uid = auth?.user?.uid;

  useEffect(() => {
    async function userData(userUid: string) {
      const res = await getUser(userUid);

      setUser(res);
    }

    if (uid) {
      userData(uid);
    }
  }, [uid]);

  return user;
};

export default useUser;
