import { useState, useEffect } from "react";
import { getUser } from "@/firebase/database/db-services";
import { UserDataProps } from "@/types";

const useUser = function (userUid: string | undefined) {
  const [user, setUser] = useState<UserDataProps | null>(null);

  useEffect(() => {
    async function userData(userUid: string) {
      const res = await getUser(userUid);

      setUser(res);
    }

    if (userUid) {
      userData(userUid);
    }
  }, [userUid]);

  return user;
};

export default useUser;

