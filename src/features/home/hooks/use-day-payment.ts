import { useEffect, useState } from "react";

import { fetchDayPayment } from "@/apis/payments";
import { PaymentsResponse } from "@/models/payments";

export const useDayPayment = (date: Date, userId: number) => {
  const [dayPayments, setDayPayments] = useState<PaymentsResponse[] | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchDayPayment(date, userId);

      if (error) {
        throw new Error(`日別収支の取得に失敗しました：${error.message}`);
      }

      setDayPayments(data);
    };

    fetch();
    // TODO: 入力後の値をカレンダーに反映したいから isOpen を監視してるけど多分そうじゃない
    // TODO: loginUserが取得できるまでLoadingにするのでuserIdは今後消す
  }, [isOpen, userId]);

  // TODO: データの編集・削除がされた時に再フェッチする。この実装なんかダサくないか
  useEffect(() => {
    if (!isRefetch) return;

    const fetch = async () => {
      const { data, error } = await fetchDayPayment(date, userId);

      if (error) {
        throw new Error(`日別収支の取得に失敗しました：${error.message}`);
      }

      setDayPayments(data);
    };

    fetch();
    setIsRefetch(false);
    // TODO: loginUserが取得できるまでLoadingにするのでuserIdは今後消す
  }, [isRefetch, userId]);

  return {
    dayPayments,
    isOpen,
    setIsOpen,
    setIsRefetch,
  };
};
