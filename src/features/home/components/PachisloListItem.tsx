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
import { PaymentRegisterForm } from "@/features/home/components/PaymentRegisterForm";
import { deletePachislo } from "@/features/home/repositories/pachislo";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
  date: Date;
  onDataChange: () => void;
}

export const PachisloListItem = ({ data, date, onDataChange }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isWin = (payment: number) => {
    return payment >= 0;
  };

  const handleEditClick = () => {
    setIsFormOpen(true);
  };

  const handleFormModalClose = () => {
    setIsFormOpen(false);
    onDataChange();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteClick = async () => {
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deletePachislo(data);

      toast.success("削除しました");
      setIsDialogOpen(false);
      onDataChange();
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
            <p>{data.pachislo_payments?.shop.name}</p>
            <p>{data.pachislo_payments?.machine.name}</p>
            <p>{data.pachislo_payments?.rate.name}</p>
          </div>

          <div className={clsx("flex", "flex-col")}>
            <p>投資: {data.pay}</p>
            <p>回収: {data.payback}</p>
            <p
              className={clsx(
                isWin(data.payback - data.pay)
                  ? "text-emerald-600"
                  : "text-red-600",
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
        isOpen={isDialogOpen}
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
