import clsx from "clsx";
import { useState } from "react";

import { Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/components/PaymentRegisterForm";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
  date: Date;
  onClick: (data: PaymentsResponse) => void;
}

export const CalendarHorseraceListItem = ({ data, date, onClick }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isWin = (payment: number) => {
    return payment >= 0;
  };

  const handleFormModalClose = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    onClick(data);
  };

  return (
    <>
      <div className={clsx("mb-7")} onClick={handleClick}>
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
                  : "text-red-600",
              )}
            >
              収支: {data.payback - data.pay}
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isFormOpen} onRequestClose={handleFormModalClose}>
        <PaymentRegisterForm
          data={data}
          date={date}
          onUpdated={handleFormModalClose}
        />
      </Modal>
    </>
  );
};

CalendarHorseraceListItem.displayName = "HorseraceListItem";
