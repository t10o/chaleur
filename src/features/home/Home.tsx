import { DatesSetArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";

import { Calender, Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/form/PaymentRegisterForm";
import { usePayments } from "@/hooks/use-payments";
import { getThisMonth } from "@/utils/date";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());

  const { events } = usePayments(targetMonth);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleDatasetChange = (datesSetArg: DatesSetArg) => {
    const thisMonth = getThisMonth(datesSetArg.start, datesSetArg.end);

    if (targetMonth.toDateString() === thisMonth.toDateString()) return;

    setTargetMonth(thisMonth);
  };

  return (
    <>
      <Calender
        events={events}
        onDateClick={handleDateClick}
        onDatasetChange={handleDatasetChange}
      />

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <PaymentRegisterForm date={selectedDate} />
      </Modal>
    </>
  );
};

Home.displayName = "Home";
