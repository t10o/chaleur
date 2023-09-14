import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

import { Button, Modal } from "@/components/elements";
import { CalendarHorseraceListItem } from "@/features/data/components/Calendar/CalendarHorseraceListItem";
import { CalendarItemDetail } from "@/features/data/components/Calendar/CalendarItemDetail";
import { CalendarPachisloListItem } from "@/features/data/components/Calendar/CalendarPachisloListItem";
import { useDayPayment } from "@/features/home/hooks/use-day-payment";
import { PaymentsResponse } from "@/models/payments";
import { formatJpYmd } from "@/utils/date";

interface Props {
  date: Date;
  userId: number;
  onCloseClick: () => void;
}

export const CalendarDetail = ({ date, userId, onCloseClick }: Props) => {
  const { dayPayments } = useDayPayment(date, userId);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PaymentsResponse>();

  const handleClick = (dayData: PaymentsResponse) => {
    setData(dayData);
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

      <div>
        {dayPayments &&
          dayPayments.map((dayPayment) => {
            return dayPayment.pachislo_payments ? (
              <CalendarPachisloListItem
                data={dayPayment}
                date={date}
                key={dayPayment.id}
                onClick={handleClick}
              />
            ) : (
              <CalendarHorseraceListItem
                data={dayPayment}
                date={date}
                key={dayPayment.id}
                onClick={handleClick}
              />
            );
          })}
      </div>

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <CalendarItemDetail
          data={data!}
          date={date}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
};
