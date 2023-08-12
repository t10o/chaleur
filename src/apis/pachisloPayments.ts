import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { PachisloFormValue } from "@/models/pachislo";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const insertPachisloPayment = async (
  value: PachisloFormValue,
  machineId: number,
  shopId: number,
) => {
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

export const updatePachisloPayment = async (
  id: number,
  value: PachisloFormValue,
  machineId: number,
  shopId: number,
) => {
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

export const deletePachisloPayment = async (id: number) => {
  const { error } = await supabase
    .from("pachislo_payments")
    .delete()
    .eq("id", id);

  return { error };
};
