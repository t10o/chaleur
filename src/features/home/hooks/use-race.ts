import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { Database } from "@/types/schema";

export const useRace = () => {
  const supabase = createPagesBrowserClient<Database>();

  const [raceMaster, setRaceMaster] = useState<RaceResponse[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const getRaceMaster = async () => {
      const { data, error } = await supabase.from("race").select();

      setRaceMaster(data);
      setError(error);
    };

    getRaceMaster();
  }, []);

  return {
    raceMaster,
    error,
  };
};
