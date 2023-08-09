import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchRaceMaster = async () => {
  const { data, error } = await supabase.from("race").select("*");

  return { data, error };
};
