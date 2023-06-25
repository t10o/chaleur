// interface PaymentsResponse {
//   created_at: string | null;
//   date: string;
//   horserace_payment_id: number | null;
//   id: number;
//   memo: string | null;
//   pachioslo_payment_id: number | null;
//   pay: number;
//   payback: number;
//   update_at: string | null;
//   user_id: string;
// }

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
  pachioslo_payment_id: number | null;
  pachislo_payments: {
    created_at: string | null;
    id: number;
    kind: string;
    machine: {
      created_at: string | null;
      id: number;
      is_pachinko: boolean;
      name: string;
    };
    shop: {
      created_at: string | null;
      id: number;
      name: string;
    };
  } | null;
  id: number;
  memo: string | null;
  pay: number;
  payback: number;
  update_at: string | null;
  user_id: string;
}
