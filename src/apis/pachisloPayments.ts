import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { MachineResponse } from "@/models/machine";
import { PachisloFormValue } from "@/models/pachislo";
import { ShopResponse } from "@/models/shop";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const insertPachoslo = async (
  value: PachisloFormValue,
  machineMaster: MachineResponse[],
  shopMaster: ShopResponse[]
) => {
  const targetMachine = machineMaster.filter(
    (machine) => machine.name === value.machine
  );

  const targetShop = shopMaster.filter((shop) => shop.name === value.shop);

  const machineId = targetMachine[0].id;
  const shopId = targetShop[0].id;

  const { data, error } = await supabase
    .from("pachislo_payments")
    .insert({ shop: shopId, kind: value.kind, machine: machineId })
    .select();

  return { data, error };
};

export const updatePachislo = async (
  id: number,
  value: PachisloFormValue,
  machineMaster: MachineResponse[],
  shopMaster: ShopResponse[]
) => {
  const targetMachine = machineMaster.filter(
    (machine) => machine.name === value.machine
  );

  const targetShop = shopMaster.filter((shop) => shop.name === value.shop);

  const machineId = targetMachine[0].id;
  const shopId = targetShop[0].id;

  const { data, error } = await supabase
    .from("pachislo_payments")
    .update({ shop: shopId, kind: value.kind, machine: machineId })
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