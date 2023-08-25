import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchShopMaster = async () => {
  const { data, error } = await supabase.from("shop").select("*");

  return { data, error };
};

export const insertShopMaster = async (shopName: string) => {
  const { data, error } = await supabase
    .from("shop")
    .insert({ name: shopName })
    .select();

  return { data, error };
};
