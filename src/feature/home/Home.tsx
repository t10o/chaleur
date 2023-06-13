import { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";

import { Calender, Modal } from "@/components/elements";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (arg: DateClickArg) => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Calender onDateClick={handleDateClick} />

      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <div>modal</div>
      </Modal>
    </>
  );
};

Home.displayName = "Home";
