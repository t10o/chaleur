import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchMachineMaster = async () => {
  const { data, error } = await supabase.from("machine").select();

  return { data, error };
};

export const insertMachineMaster = async (
  machineName: string,
  kind: string,
) => {
  const { data, error } = await supabase
    .from("machine")
    .insert({
      name: machineName,
      kind: kind,
    })
    .select();

  return { data, error };
};
