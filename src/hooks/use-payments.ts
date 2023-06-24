import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { HorseraceFormValue } from "@/models/horserace";
import { PachisloFormValue } from "@/models/pachislo";
import { Database } from "@/types/schema";

export const usePayments = () => {
  const supabase = createPagesBrowserClient<Database>();

  const insertPaymentForPachoslo = async (
    value: PachisloFormValue,
    pachisloPaymentId: number,
    date: Date,
    userId: string
  ) => {
    const { error } = await supabase.from("payments").insert({
      date: date.toDateString(),
      pay: value.pay,
      payback: value.payback,
      memo: value.memo,
      pachioslo_payment_id: pachisloPaymentId,
      user_id: userId,
    });

    return { error };
  };

  const insertPaymentForHorserace = async (
    value: HorseraceFormValue,
    horseracePaymentId: number,
    date: Date,
    userId: string
  ) => {
    const { error } = await supabase.from("payments").insert({
      date: date.toDateString(),
      pay: value.pay,
      payback: value.payback,
      memo: value.memo,
      horserace_payment_id: horseracePaymentId,
      user_id: userId,
    });

    return { error };
  };

  return { insertPaymentForPachoslo, insertPaymentForHorserace };
};
