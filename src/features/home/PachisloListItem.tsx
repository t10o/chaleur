import clsx from "clsx";
import { useState } from "react";

import { Button, Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/form/PaymentRegisterForm";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
  date: Date;
}

export const PachisloListItem = ({ data, date }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const isWin = (payment: number) => {
    return payment >= 0;
  };

  const handleEditClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
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
          <Button
            className={clsx(
              "w-1/2",
              "bg-accent",
              "text-white",
              "text-sm",
              "mr-2"
            )}
            label="削除"
          />

          <Button
            className={clsx("w-1/2", "bg-primary", "text-white", "text-sm")}
            label="編集"
            onClick={handleEditClick}
          />
        </div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <PaymentRegisterForm
          data={data}
          date={date}
          onUpdated={handleModalClose}
        />
      </Modal>
    </>
  );
};
