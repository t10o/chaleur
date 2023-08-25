export interface PaymentsResponse {
  created_at: string | null;
  date: string;
  horserace_payment_id: number | null;
  horserace_payments: {
    created_at: string | null;
    id: number;
    race: {
      created_at: string | null;
      id: number;
      name: string;
    };
    racecourse: {
      created_at: string | null;
      id: number;
      name: string;
    };
  } | null;
  pachislo_payment_id: number | null;
  pachislo_payments: {
    created_at: string | null;
    id: number;
    kind: string;
    machine: {
      created_at: string | null;
      id: number;
      kind: string;
      name: string;
    };
    shop: {
      created_at: string | null;
      id: number;
      name: string;
    };
    rate: {
      created_at: string | null;
      id: number;
      name: string;
      kind: string;
    };
  } | null;
  id: number;
  memo: string | null;
  pay: number;
  payback: number;
  update_at: string | null;
  user_id: number;
}

export interface RankingPaymentResponse {
  pay: number;
  payback: number;
  user_id: number;
  general_users: { nickname: string } | null;
}
