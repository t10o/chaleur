import { insertHorserace, updateHorserace } from "@/apis/horseracePayments";
import {
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
    ? await updateHorserace(data.horserace_payment_id!, formData)
    : await insertHorserace(formData);

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
