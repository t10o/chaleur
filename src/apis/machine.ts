import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchMachineMaster = async () => {
  const { data, error } = await supabase.from("machine").select();

  return { data, error };
};

const fetchMachineMasterCount = async () => {
  const { count } = await supabase
    .from("machine")
    .select("*", { count: "exact", head: true });

  return count;
};

export const insertMachineMaster = async (
  machineName: string,
  kind: string,
) => {
  const count = await fetchMachineMasterCount();

  const { error } = await supabase
    .from("machine")
    .insert({
      id: count! + 1,
      name: machineName,
      kind: kind,
    })
    .select();

  return error;
};
