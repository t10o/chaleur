import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { fetchMachineMaster } from "@/apis/machine";
import { fetchRateMaster } from "@/apis/rate";
import { fetchShopMaster } from "@/apis/shop";
import { PachisloFormValue } from "@/models/pachislo";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const insertPachoslo = async (value: PachisloFormValue) => {
  const { machineMaster, shopMaster, rateMaster } = await fetchMasters();

  const targetMachine = machineMaster!.filter(
    (machine) => machine.name === value.machine
  );
  const targetShop = shopMaster!.filter((shop) => shop.name === value.shop);

  const machineId = targetMachine[0].id;
  const shopId = targetShop[0].id;

  const { data, error } = await supabase
    .from("pachislo_payments")
    .insert({
      shop: shopId,
      kind: value.kind,
      machine: machineId,
      rate: Number(value.rate),
    })
    .select();

  return { data, error };
};

export const updatePachislo = async (id: number, value: PachisloFormValue) => {
  const { machineMaster, shopMaster, rateMaster } = await fetchMasters();

  const targetMachine = machineMaster!.filter(
    (machine) => machine.name === value.machine
  );
  const targetShop = shopMaster!.filter((shop) => shop.name === value.shop);

  const machineId = targetMachine[0].id;
  const shopId = targetShop[0].id;

  const { data, error } = await supabase
    .from("pachislo_payments")
    .update({
      shop: shopId,
      kind: value.kind,
      machine: machineId,
      rate: Number(value.rate),
    })
    .eq("id", id)
    .select();

  return { data, error };
};

export const deletePachislo = async (id: number) => {
  const { error } = await supabase
    .from("pachislo_payments")
    .delete()
    .eq("id", id);

  return { error };
};

const fetchMasters = async () => {
  const { data: machineMaster } = await fetchMachineMaster();
  const { data: shopMaster } = await fetchShopMaster();
  const { data: rateMaster } = await fetchRateMaster();

  return {
    machineMaster,
    shopMaster,
    rateMaster,
  };
};
