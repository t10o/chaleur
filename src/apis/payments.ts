import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { HorseraceFormValue } from "@/models/horserace";
import { PachisloFormValue } from "@/models/pachislo";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const insertPaymentForPachoslo = async (
  value: PachisloFormValue,
  pachisloPaymentId: number,
  date: Date,
  userId: string
) => {
  const { error } = await supabase.from("payments").insert({
    date: date.toDateString(),
    pay: Number(value.pay),
    payback: Number(value.payback),
    memo: value.memo,
    pachioslo_payment_id: pachisloPaymentId,
    user_id: userId,
  });

  return { error };
};

export const updatePaymentForPachoslo = async (
  id: number,
  value: PachisloFormValue,
  pachisloPaymentId: number,
  date: Date,
  userId: string
) => {
  const { error } = await supabase
    .from("payments")
    .update({
      date: date.toDateString(),
      pay: Number(value.pay),
      payback: Number(value.payback),
      memo: value.memo,
      pachioslo_payment_id: pachisloPaymentId,
      user_id: userId,
    })
    .eq("id", id);

  return { error };
};

export const insertPaymentForHorserace = async (
  value: HorseraceFormValue,
  horseracePaymentId: number,
  date: Date,
  userId: string
) => {
  const { error } = await supabase.from("payments").insert({
    date: date.toDateString(),
    pay: Number(value.pay),
    payback: Number(value.payback),
    memo: value.memo,
    horserace_payment_id: horseracePaymentId,
    user_id: userId,
  });

  return { error };
};

export const updatePaymentForHorserace = async (
  id: number,
  value: HorseraceFormValue,
  horseracePaymentId: number,
  date: Date,
  userId: string
) => {
  const { error } = await supabase
    .from("payments")
    .update({
      date: date.toDateString(),
      pay: Number(value.pay),
      payback: Number(value.payback),
      memo: value.memo,
      horserace_payment_id: horseracePaymentId,
      user_id: userId,
    })
    .eq("id", id);

  return { error };
};

export const deletePayment = async (id: number) => {
  const { error } = await supabase.from("payments").delete().eq("id", id);

  return { error };
};
