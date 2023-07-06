import _ from "lodash";
import { useEffect, useState } from "react";

import { fetchTimelinePayment } from "@/apis/payments";
import { PaymentsResponse } from "@/models/payments";

export const useTimeline = () => {
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());
  const [monthPayments, setMonthPayments] = useState<PaymentsResponse[] | null>(
    []
  );
  const [timelineData, setTimelineData] = useState<any>();
  const [noMoreData, setNoMoreData] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchTimelinePayment(targetMonth);

      if (error) {
        throw new Error(`月別収支の取得に失敗しました: ${error.message}`);
      }

      if (!data || !data.length) {
        setNoMoreData(true);

        return;
      }

      setMonthPayments([...monthPayments!, ...data]);
    };

    fetch();
  }, [targetMonth]);

  useEffect(() => {
    const groupedMonthPayments = _.chain(monthPayments)
      .groupBy((monthPayment) => monthPayment.date)
      .value();

    setTimelineData(groupedMonthPayments);
  }, [monthPayments]);

  useEffect(() => {
    if (!load) return;

    setTargetMonth(
      new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth() - 3,
        targetMonth.getDate()
      )
    );

    setLoad(false);
  }, [load]);

  return { timelineData, noMoreData, setLoad };
};
