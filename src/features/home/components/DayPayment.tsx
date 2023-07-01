import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Button, Modal } from "@/components/elements";
import { HorseraceListItem } from "@/features/home/components/HorseraceListItem";
import { PachisloListItem } from "@/features/home/components/PachisloListItem";
import { PaymentRegisterForm } from "@/features/home/components/PaymentRegisterForm";
import { useDayPayment } from "@/features/home/hooks/use-day-payment";
import { formatJpYmd } from "@/utils/date";

interface Props {
  date: Date;
  onCloseClick: () => void;
}

export const DayPayment = ({ date, onCloseClick }: Props) => {
  const { dayPayments, isOpen, setIsOpen } = useDayPayment(date);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

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
            <PachisloListItem
              data={dayPayment}
              date={date}
              key={dayPayment.id}
            />
          ) : (
            <HorseraceListItem
              data={dayPayment}
              date={date}
              key={dayPayment.id}
            />
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
        <PaymentRegisterForm date={date} onUpdated={handleModalClose} />
      </Modal>
    </>
  );
};

DayPayment.displayName = "DayPayment";
