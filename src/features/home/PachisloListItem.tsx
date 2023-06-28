import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  AccentButton,
  Button,
  Dialog,
  Modal,
  PrimaryButton,
} from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/form/PaymentRegisterForm";
import { usePachislo } from "@/hooks/use-pachislo";
import { usePayments } from "@/hooks/use-payments";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
  date: Date;
}

export const PachisloListItem = ({ data, date }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { deletePachislo } = usePachislo();
  const { deletePayment } = usePayments(date);

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

      if (paymentError) throw paymentError;

      const { error: pachisloError } = await deletePachislo(
        data.pachioslo_payment_id!
      );

      if (pachisloError) throw pachisloError;

      toast.success("削除しました");
      setIsConfirmOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className={clsx("mb-7")}>
        <div
          className={clsx("flex", "justify-between", "items-center", "mb-3")}
        >
          <div className={clsx("flex", "flex-col")}>
            <p>{data.pachislo_payments?.shop.name}</p>
            <p>{data.pachislo_payments?.machine.name}</p>
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
