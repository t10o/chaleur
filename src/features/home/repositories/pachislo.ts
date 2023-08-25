import { insertMachineMaster } from "@/apis/machine";
import {
  deletePachisloPayment,
  insertPachisloPayment,
  updatePachisloPayment,
} from "@/apis/pachisloPayments";
import {
  deletePayment,
  insertPaymentForPachoslo,
  updatePaymentForPachoslo,
} from "@/apis/payments";
import { insertShopMaster } from "@/apis/shop";
import { Machine } from "@/models/machine";
import { PachisloFormValue } from "@/models/pachislo";
import { PaymentsResponse } from "@/models/payments";
import { Shop } from "@/models/shop";

export const submitPachislo = async (
  formData: PachisloFormValue,
  machineNames: string[] | null,
  machineMaster: Machine[] | null,
  shopNames: string[] | null,
  shopMaster: Shop[] | null,
  userId: number,
  date: Date,
  data?: PaymentsResponse,
) => {
  // 台名がまだマスタにない場合、新しく登録する
  let newMachine;
  let newShop;
  if (machineNames && !machineNames.includes(formData.machine)) {
    const { data, error } = await insertMachineMaster(
      formData.machine,
      formData.kind,
    );

    newMachine = data;

    if (error) {
      throw new Error(`台マスタの保存に失敗しました：${error.message}`);
    }
  }

  // 店名がまだマスタにない場合、新しく登録する
  if (shopNames && !shopNames.includes(formData.shop)) {
    const { data, error } = await insertShopMaster(formData.shop);

    if (error) {
      throw new Error(`店マスタの保存に失敗しました：${error.message}`);
    }

    newShop = data;
  }

  const targetMachine = machineMaster!.filter(
    (machine) => machine.name === formData.machine,
  );

  const targetShop = shopMaster!.filter((shop) => shop.name === formData.shop);

  const { data: pachisloData, error: pachisloError } = data
    ? await updatePachisloPayment(
        data.pachislo_payment_id!,
        formData,
        targetMachine.length > 0 ? targetMachine[0].id : newMachine![0].id,
        targetShop.length > 0 ? targetShop[0].id : newShop![0].id,
      )
    : await insertPachisloPayment(
        formData,
        targetMachine[0].id,
        targetShop[0].id,
      );

  if (pachisloError) {
    throw new Error(
      `パチスロ収支の保存に失敗しました：${pachisloError.message}`,
    );
  }

  const { error } = data
    ? await updatePaymentForPachoslo(
        data.id,
        formData,
        pachisloData![0].id,
        date,
        userId,
      )
    : await insertPaymentForPachoslo(
        formData,
        pachisloData![0].id,
        date,
        userId,
      );

  if (error) {
    throw new Error(`収支の保存に失敗しました：${error.message}`);
  }
};

export const deletePachislo = async (data: PaymentsResponse) => {
  const { error: paymentError } = await deletePayment(data.id);

  if (paymentError)
    throw new Error(`収支の削除に失敗しました：${paymentError.message}`);

  const { error: pachisloError } = await deletePachisloPayment(
    data.pachislo_payment_id!,
  );

  if (pachisloError)
    throw new Error(
      `パチスロ収支の削除に失敗しました：${pachisloError.message}`,
    );
};
