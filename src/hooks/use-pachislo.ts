import { supabase } from "@/lib/supabaseClient";
import { MachineResponse } from "@/models/machine";
import { PachisloFormValue } from "@/models/pachislo";
import { ShopResponse } from "@/models/shop";

export const usePachislo = () => {
  const insertPachoslo = async (
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
      .from("pachislo_payment")
      .insert({ shop: shopId, kind: value.kind, machine: machineId })
      .select();

    return { data, error };
  };

  return { insertPachoslo };
};
