import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { RacecourseResponse } from "@/models/racecourse";
import { Database } from "@/types/schema";

export const useRacecourse = () => {
  const supabase = createPagesBrowserClient<Database>();

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
