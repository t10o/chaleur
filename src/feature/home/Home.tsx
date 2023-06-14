import { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";

import { Calender, Modal } from "@/components/elements";
import { PaymentRegisterForm } from "@/feature/home/form/PaymentRegisterForm";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Calender onDateClick={handleDateClick} />

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <PaymentRegisterForm date={selectedDate} />
      </Modal>
    </>
  );
};

Home.displayName = "Home";
