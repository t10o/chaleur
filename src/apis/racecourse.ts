import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchRacecourseMaster = async () => {
  const { data, error } = await supabase.from("racecourse").select();

  return { data, error };
};
