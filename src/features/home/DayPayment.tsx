import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

import { Button, Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/form/PaymentRegisterForm";
import { HorseraceListItem } from "@/features/home/HorseraceListItem";
import { PachisloListItem } from "@/features/home/PachisloListItem";
import { usePayments } from "@/hooks/use-payments";
import { formatJpYmd } from "@/utils/date";

interface Props {
  date: Date;
  onCloseClick: () => void;
}

export const DayPayment = ({ date, onCloseClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dayPayments } = usePayments(date);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  console.log(dayPayments);

  return (
    <>
      <div className={clsx("flex", "justify-between", "items-center", "mb-4")}>
        <div className={clsx("text-lg", "font-bold")}>{formatJpYmd(date)}</div>

        <Button onClick={onCloseClick}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>

      {dayPayments &&
        dayPayments.map((dayPayment) => {
          return dayPayment.pachislo_payments ? (
            <PachisloListItem data={dayPayment} />
          ) : (
            <HorseraceListItem data={dayPayment} />
          );
        })}

      <Button
        className={clsx("w-full", "bg-primary", "text-white", "mt-8")}
        onClick={handleClick}
      >
        <FontAwesomeIcon className={clsx("mr-2")} icon={faPlus} />
        追加
      </Button>

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <PaymentRegisterForm date={date} />
      </Modal>
    </>
  );
};

DayPayment.displayName = "DayPayment";
