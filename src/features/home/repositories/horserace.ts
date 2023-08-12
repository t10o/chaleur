import {
  deleteHorseracePayment,
  insertHorseracePayment,
  updateHorseracePayment,
} from "@/apis/horseracePayments";
import {
  deletePayment,
  insertPaymentForHorserace,
  updatePaymentForHorserace,
} from "@/apis/payments";
import { HorseraceFormValue } from "@/models/horserace";
import { PaymentsResponse } from "@/models/payments";

export const submitHorserace = async (
  formData: HorseraceFormValue,
  userId: number,
  date: Date,
  data?: PaymentsResponse,
) => {
  const { data: horseraceData, error: horseraceError } = data
    ? await updateHorseracePayment(data.horserace_payment_id!, formData)
    : await insertHorseracePayment(formData);

  if (horseraceError) {
    throw new Error(`競馬収支の保存に失敗しました：${horseraceError.message}`);
  }

  const { error } = data
    ? await updatePaymentForHorserace(
        data.id,
        formData,
        horseraceData![0].id,
        date,
        userId,
      )
    : await insertPaymentForHorserace(
        formData,
        horseraceData![0].id,
        date,
        userId,
      );

  if (error) {
    throw new Error(`収支の保存に失敗しました：${error.message}`);
  }
};

export const deleteHorserace = async (data: PaymentsResponse) => {
  const { error: paymentError } = await deletePayment(data.id);

  if (paymentError) {
    throw new Error(`収支の削除に失敗しました：${paymentError.message}`);
  }

  const { error: horseraceError } = await deleteHorseracePayment(
    data.horserace_payment_id!,
  );

  if (horseraceError) {
    throw new Error(`競馬収支の削除に失敗しました：${horseraceError.message}`);
  }
};
