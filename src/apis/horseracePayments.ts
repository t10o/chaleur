import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { HorseraceFormValue } from "@/models/horserace";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const insertHorseracePayment = async (value: HorseraceFormValue) => {
  const { data, error } = await supabase
    .from("horserace_payments")
    .insert({
      racecourse: Number(value.racecourse),
      race: Number(value.race),
    })
    .select();

  return { data, error };
};

export const updateHorseracePayment = async (
  id: number,
  value: HorseraceFormValue,
) => {
  const { data, error } = await supabase
    .from("horserace_payments")
    .update({
      racecourse: Number(value.racecourse),
      race: Number(value.race),
    })
    .eq("id", id)
    .select();

  return { data, error };
};

export const deleteHorseracePayment = async (id: number) => {
  const { error } = await supabase
    .from("horserace_payments")
    .delete()
    .eq("id", id);

  return { error };
};
