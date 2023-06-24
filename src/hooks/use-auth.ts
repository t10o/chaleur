import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";

import { Database } from "@/types/schema";

export const useAuth = () => {
  const supabase = createPagesBrowserClient<Database>();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, []);

  return { session };
};
