import { useEffect, useState } from "react";

import { fetchUser } from "@/apis/users";
import { User } from "@/models/users";

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchUser(userId);

      if (error) {
        throw new Error(`ユーザー情報の取得に失敗しました：${error.message}`);
      }

      setUser(data![0]);
    };

    fetch();
  }, []);

  return { user };
};
