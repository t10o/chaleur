import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { HorseraceFormValue } from "@/models/horserace";
import { PachisloFormValue } from "@/models/pachislo";
import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchMonthPayments = async (date: Date, userId: number) => {
  const lastDate = new Date(date);
  lastDate.setMonth(date.getMonth() + 1);
  lastDate.setDate(0);

  const firstDate = new Date(date);
  firstDate.setDate(1);

  const { data, error } = await supabase
    .from("payments")
    .select(
      "*, pachislo_payments(*, machine(*), shop(*), rate(*)), horserace_payments(*, race(*), racecourse(*))",
    )
    .eq("user_id", userId)
    .lte("date", lastDate.toDateString())
    .gte("date", firstDate.toDateString());

  return { data, error };
};

export const fetchDayPayment = async (date: Date, userId: number) => {
  const { data, error } = await supabase
    .from("payments")
    .select(
      "*, pachislo_payments(*, machine(*), shop(*), rate(*)), horserace_payments(*, race(*), racecourse(*))",
    )
    .eq("date", date.toDateString())
    .eq("user_id", userId);

  return { data, error };
};

export const fetchTimelinePayment = async (date: Date) => {
  const lastDate = new Date(date);
  lastDate.setMonth(date.getMonth() + 1);
  lastDate.setDate(0);

  const firstDate = new Date(date);
  firstDate.setMonth(date.getMonth() - 2);
  firstDate.setDate(1);

  const { data, error } = await supabase
    .from("payments")
    .select(
      "*, pachislo_payments(*, machine(*), shop(*), rate(*)), horserace_payments(*, race(*), racecourse(*)), general_users(*)",
    )
    .lte("date", lastDate.toDateString())
    .gte("date", firstDate.toDateString())
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  return { data, error };
};

export const fetchMonthlyRankingPayments = async (date: Date) => {
  const lastDate = new Date(date);
  lastDate.setMonth(date.getMonth() + 1);
  lastDate.setDate(0);

  const firstDate = new Date(date);
  firstDate.setDate(1);

  const { data, error } = await supabase
    .from("payments")
    .select("pay, payback, user_id, general_users(nickname)")
    .lte("date", lastDate.toDateString())
    .gte("date", firstDate.toDateString());

  return { data, error };
};

export const fetchYearlyRankingPayments = async (date: Date) => {
  const lastDate = new Date(date);
  lastDate.setMonth(11);
  lastDate.setDate(31);

  const firstDate = new Date(date);
  firstDate.setMonth(0);
  firstDate.setDate(1);

  const { data, error } = await supabase
    .from("payments")
    .select("pay, payback, user_id, general_users(nickname)")
    .lte("date", lastDate.toDateString())
    .gte("date", firstDate.toDateString());

  return { data, error };
};

export const insertPaymentForPachoslo = async (
  value: PachisloFormValue,
  pachisloPaymentId: number,
  date: Date,
  userId: number,
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
  userId: number,
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
  userId: number,
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
  userId: number,
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
