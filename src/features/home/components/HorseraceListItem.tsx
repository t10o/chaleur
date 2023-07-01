import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";

import { deleteHorserace } from "@/apis/horseracePayments";
import { deletePayment } from "@/apis/payments";
import {
  AccentButton,
  Button,
  Dialog,
  Modal,
  PrimaryButton,
} from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/components/PaymentRegisterForm";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
  date: Date;
}

export const HorseraceListItem = ({ data, date }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isWin = (payment: number) => {
    return payment >= 0;
  };

  const handleEditClick = () => {
    setIsFormOpen(true);
  };

  const handleFormModalClose = () => {
    setIsFormOpen(false);
  };

  const handleDialogClose = () => {
    setIsConfirmOpen(false);
  };

  const handleDeleteClick = async () => {
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const { error: paymentError } = await deletePayment(data.id);

      if (paymentError) {
        throw new Error(`収支の削除に失敗しました：${paymentError.message}`);
      }

      const { error: horseraceError } = await deleteHorserace(
        data.horserace_payment_id!
      );

      if (horseraceError)
        throw new Error(
          `競馬収支の削除に失敗しました：${horseraceError.message}`
        );

      toast.success("削除しました");
      setIsConfirmOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={clsx("mb-7")}>
        <div
          className={clsx("flex", "justify-between", "items-center", "mb-3")}
        >
          <div className={clsx("flex", "flex-col")}>
            <p>{data.horserace_payments?.racecourse.name}</p>
            <p>{data.horserace_payments?.race.name}</p>
          </div>

          <div className={clsx("flex", "flex-col")}>
            <p>投資: {data.pay}</p>
            <p>回収: {data.payback}</p>
            <p
              className={clsx(
                isWin(data.payback - data.pay)
                  ? "text-emerald-600"
                  : "text-red-600"
              )}
            >
              収支: {data.payback - data.pay}
            </p>
          </div>
        </div>

        <div className={clsx("flex", "justify-between", "items-center")}>
          <AccentButton
            className={clsx("w-1/2", "text-sm", "mr-2")}
            label="削除"
            onClick={handleDeleteClick}
          />

          <PrimaryButton
            className={clsx("w-1/2", "text-sm")}
            label="編集"
            onClick={handleEditClick}
          />
        </div>
      </div>

      <Modal isOpen={isFormOpen} onRequestClose={handleFormModalClose}>
        <PaymentRegisterForm
          data={data}
          date={date}
          onUpdated={handleFormModalClose}
        />
      </Modal>

      <Dialog
        isOpen={isConfirmOpen}
        title="なんで消すん？"
        message="負けたの隠そうってことなら消さんといてください。"
        onRequestClose={handleDialogClose}
      >
        <div
          className={clsx("flex", "justify-between", "items-center", "mt-4")}
        >
          <Button
            className={clsx("mr-2", "w-1/2")}
            label="キャンセル"
            onClick={handleDialogClose}
          />

          <AccentButton
            className={clsx("w-1/2")}
            label="削除"
            onClick={handleDelete}
          />
        </div>
      </Dialog>
    </>
  );
};

HorseraceListItem.displayName = "HorseraceListItem";
