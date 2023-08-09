import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchRateMaster = async () => {
  const { data, error } = await supabase.from("rate").select("*");

  return { data, error };
};
