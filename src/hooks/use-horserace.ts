import { supabase } from "@/lib/supabaseClient";
import { HorseraceFormValue } from "@/models/horserace";

export const useHorserace = () => {
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

  return { insertHorserace };
};
