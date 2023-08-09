import _ from "lodash";
import { useEffect, useState } from "react";

import { fetchMonthPayments } from "@/apis/payments";
import { CalendarEvent } from "@/components/elements";
import { PaymentsResponse } from "@/models/payments";

export const useHome = (userId: number) => {
  const [monthPayments, setMonthPayments] = useState<PaymentsResponse[] | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchMonthPayments(targetMonth, userId);

      if (error) {
        throw new Error(`月別収支の取得に失敗しました: ${error.message}`);
      }

      setMonthPayments(data);
    };

    fetch();
    // 入力後の値をカレンダーに反映したいから isOpen を監視してる
    // TODO: loginUserが取得できるまでLoadingにするのでuserIdは今後消す
  }, [targetMonth, isOpen, userId]);

  useEffect(() => {
    if (!monthPayments) return;

    const events = createEvents();

    setEvents(events);
  }, [monthPayments]);

  const createEvents = () => {
    const groupedMonthPayments = _.chain(monthPayments)
      .groupBy((monthPayment) => monthPayment.date)
      .map((monthPayments, date) => ({
        date: date,
        payment: monthPayments.map(
          (monthPayment) => monthPayment.payback - monthPayment.pay
        ),
      }))
      .value();

    return groupedMonthPayments.map((groupedMonthPayment) => {
      return {
        date: groupedMonthPayment.date,
        title: `${groupedMonthPayment.payment.reduce(
          (sum, element) => sum + element,
          0
        )}`,
        color: eventColor(
          groupedMonthPayment.payment.reduce((sum, element) => sum + element, 0)
        ),
      };
    });
  };

  const eventColor = (payment: number) => {
    return payment > 0 ? "green" : "red";
  };

  return {
    monthPayments,
    events,
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
    targetMonth,
    setTargetMonth,
  };
};
