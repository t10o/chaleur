import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { HorseraceFormValue } from "@/models/horserace";
import { Database } from "@/types/schema";

export const useHorserace = () => {
  const supabase = createPagesBrowserClient<Database>();

  const insertHorserace = async (value: HorseraceFormValue) => {
    const { data, error } = await supabase
      .from("horserace_payments")
      .insert({
        racecourse: Number(value.racecourse),
        race: Number(value.race),
      })
      .select();

    return { data, error };
  };

  const updateHorserace = async (id: number, value: HorseraceFormValue) => {
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

  return { insertHorserace, updateHorserace };
};
