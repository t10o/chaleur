import { DatesSetArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";

import { Calender, Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/features/home/form/PaymentRegisterForm";
import { usePayments } from "@/hooks/use-payments";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());
  const { events } = usePayments(new Date());

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleDatasetChange = (datesSetArg: DatesSetArg) => {
    setTargetMonth(new Date(datesSetArg.start));
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
