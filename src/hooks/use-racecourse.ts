import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { RacecourseResponse } from "@/models/racecourse";

export const useRacecourse = () => {
  const [racecourseMaster, setRacecourseMaster] = useState<
    RacecourseResponse[] | null
  >(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const getRacecourseMaster = async () => {
      const { data, error } = await supabase.from("racecourse").select();

      setRacecourseMaster(data);
      setError(error);
    };

    getRacecourseMaster();
  }, []);

  return {
    racecourseMaster,
    error,
  };
};
