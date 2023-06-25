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

  return (
    <>
      <Calender events={events} onDateClick={handleDateClick} />

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <PaymentRegisterForm date={selectedDate} />
      </Modal>
    </>
  );
};

Home.displayName = "Home";
