import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import _ from "lodash";
import { useEffect, useState } from "react";

import { CalendarEvent } from "@/components/elements";
import { PaymentsResponse } from "@/models/payments";
import { Database } from "@/types/schema";

export const usePayments = (date: Date) => {
  const supabase = createPagesBrowserClient<Database>();

  const [monthPayments, setMonthPayments] = useState<PaymentsResponse[] | null>(
    null
  );

  const [dayPayments, setDayPayments] = useState<PaymentsResponse[] | null>(
    null
  );

  const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);

  useEffect(() => {
    fetchPayments();
  }, [date]);

  useEffect(() => {
    if (!monthPayments) return;

    const groupedMonthPayments = _.chain(monthPayments)
      .groupBy((monthPayment) => monthPayment.date)
      .map((monthPayments, date) => ({
        date: date,
        payment: monthPayments.map(
          (monthPayment) => monthPayment.payback - monthPayment.pay
        ),
      }))
      .value();

    const events = groupedMonthPayments.map((groupedMonthPayment) => {
      return {
        date: groupedMonthPayment.date,
        title: `${groupedMonthPayment.payment.reduce(
          (sum, element) => sum + element,
          0
        )}`,
        color: paymentColor(
          groupedMonthPayment.payment.reduce((sum, element) => sum + element, 0)
        ),
      };
    });

    setEvents(events);
  }, [monthPayments]);

  const fetchPayments = async () => {
    const lastDate = new Date(date);
    lastDate.setMonth(date.getMonth() + 1);
    lastDate.setDate(0);

    const firstDate = new Date(date);
    firstDate.setDate(1);

    const { data, error } = await supabase
      .from("payments")
      .select(
        "*, pachislo_payments(*, machine(*), shop(*)), horserace_payments(*, race(*), racecourse(*))"
      )
      .lt("date", lastDate.toISOString())
      .gt("date", firstDate.toISOString());

    if (error) throw error;

    setMonthPayments(data);

    const dayPayments = data.filter((dayPayment) => {
      return new Date(dayPayment.date).toDateString() === date.toDateString();
    });

    setDayPayments(dayPayments);
  };

  const paymentColor = (payment: number) => {
    return payment > 0 ? "green" : "red";
  };

  return {
    monthPayments,
    dayPayments,
    events,
  };
};
