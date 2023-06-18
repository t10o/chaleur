import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { ShopResponse } from "@/models/shop";

export const useShopMaster = () => {
  const [shopMaster, setShopMaster] = useState<ShopResponse[] | null>(null);
  const [shopNames, setShopNames] = useState<string[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const getShopMaster = async () => {
      const { data, error } = await supabase.from("shop").select();

      const shopName = data && !error ? data.map((data) => data.name) : null;

      setShopMaster(data);
      setShopNames(shopName);
      setError(error);
    };

    getShopMaster();
  }, []);

  const insertShopMaster = async (shopName: string) => {
    const id = shopNames!.length + 1;

    const { data, error } = await supabase
      .from("shop")
      .insert({ id, name: shopName })
      .select();

    console.log(data);

    setShopMaster(data);

    return error;
  };

  return {
    shopMaster,
    shopNames,
    error,
    insertShopMaster,
  };
};
