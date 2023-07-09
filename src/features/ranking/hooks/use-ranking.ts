import { useEffect, useState } from "react";

import {
  fetchMonthlyRankingPayments,
  fetchYearlyRankingPayments,
} from "@/apis/payments";
import { RankingPaymentResponse } from "@/models/payments";

export interface Ranking {
  payment: number;
  userId: number;
  nickname: string | undefined;
}

export const useRanking = () => {
  const [monthlyPayments, setMonthlyPayments] = useState<
    RankingPaymentResponse[] | null
  >(null);
  const [yearlyPayments, setYearlyPayments] = useState<
    RankingPaymentResponse[] | null
  >(null);
  const [monthlyTopFiveUsers, setMonthlyTopFiveUsers] = useState<
    Ranking[] | null
  >(null);
  const [yearlyTopFiveUsers, setYearlyTopFiveUsers] = useState<
    Ranking[] | null
  >(null);

  useEffect(() => {
    const fetchMonthly = async () => {
      const { data, error } = await fetchMonthlyRankingPayments(new Date());

      if (error) {
        throw new Error(`月間ランキングの取得に失敗しました：${error.message}`);
      }

      setMonthlyPayments(data);
    };

    const fetchYearly = async () => {
      const { data, error } = await fetchYearlyRankingPayments(new Date());

      if (error) {
        throw new Error(`年間ランキングの取得に失敗しました：${error.message}`);
      }

      setYearlyPayments(data);
    };

    fetchMonthly();
    fetchYearly();
  }, []);

  useEffect(() => {
    if (!monthlyPayments || !monthlyPayments.length) {
      setMonthlyTopFiveUsers(null);

      return;
    }

    setMonthlyTopFiveUsers(createRankingData(monthlyPayments));
  }, [monthlyPayments]);

  useEffect(() => {
    if (!yearlyPayments || !yearlyPayments.length) {
      setMonthlyTopFiveUsers(null);

      return;
    }

    setYearlyTopFiveUsers(createRankingData(yearlyPayments));
  }, [yearlyPayments]);

  const createRankingData = (data: RankingPaymentResponse[]) => {
    const userIds = Array.from(
      new Set(
        data.map((monthlyPayment) => {
          return monthlyPayment.user_id;
        }),
      ),
    );

    const users = [];

    for (const userId of [...userIds]) {
      users.push({
        userId,
        nickname: data.filter((monthlyPayment) => {
          return monthlyPayment.user_id === userId;
        })[0].general_users?.nickname,
        payment: getPayment(userId, data),
      });
    }

    const rankedUsers = users.sort((a, b) => (a.payment > b.payment ? -1 : 1));

    return rankedUsers.slice(0, 5);
  };

  const getPayment = (userId: number, data: RankingPaymentResponse[]) => {
    let allPayback = 0;

    for (const payment of data) {
      if (payment.user_id === userId) {
        allPayback += payment.payback - payment.pay;
      }
    }

    return allPayback;
  };

  return { monthlyTopFiveUsers, yearlyTopFiveUsers };
};
