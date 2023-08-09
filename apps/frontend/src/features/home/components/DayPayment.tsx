import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

import { Button, Modal } from "@/components/elements";
import { HorseraceListItem } from "@/features/home/components/HorseraceListItem";
import { PachisloListItem } from "@/features/home/components/PachisloListItem";
import { PaymentRegisterForm } from "@/features/home/components/PaymentRegisterForm";
import { useDayPayment } from "@/features/home/hooks/use-day-payment";
import { AuthState, authState } from "@/stores/auth";
import { formatJpYmd } from "@/utils/date";

interface Props {
  date: Date;
  onCloseClick: () => void;
}

export const DayPayment = ({ date, onCloseClick }: Props) => {
  const auth = useRecoilValue<AuthState>(authState);

  const { dayPayments, isOpen, setIsOpen, setIsRefetch } = useDayPayment(
    date,
    auth.id
  );

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleDataChange = () => {
    setIsRefetch(true);
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
              onDataChange={handleDataChange}
            />
          ) : (
            <HorseraceListItem
              data={dayPayment}
              date={date}
              key={dayPayment.id}
              onDataChange={handleDataChange}
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
