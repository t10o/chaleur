import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchShopMaster = async () => {
  const { data, error } = await supabase.from("shop").select();

  return { data, error };
};

const fetchShopMasterCount = async () => {
  const { count } = await supabase
    .from("shop")
    .select("*", { count: "exact", head: true });

  return count;
};

export const insertShopMaster = async (shopName: string) => {
  const count = await fetchShopMasterCount();

  const { error } = await supabase
    .from("shop")
    .insert({ id: count! + 1, name: shopName })
    .select();

  return error;
};
