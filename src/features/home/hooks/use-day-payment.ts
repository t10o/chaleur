import { useEffect, useState } from "react";

import { fetchDayPayment } from "@/apis/payments";
import { PaymentsResponse } from "@/models/payments";

export const useDayPayment = (date: Date) => {
  const [dayPayments, setDayPayments] = useState<PaymentsResponse[] | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchDayPayment(date);

      if (error) throw new Error(`fetchDayPayment: ${error.message}`);

      setDayPayments(data);
    };

    fetch();
    // 入力後の値をカレンダーに反映したいから isOpen を監視してる
  }, [isOpen]);

  return { dayPayments, isOpen, setIsOpen };
};
