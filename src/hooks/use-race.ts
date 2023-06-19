import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

export const useRace = () => {
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
