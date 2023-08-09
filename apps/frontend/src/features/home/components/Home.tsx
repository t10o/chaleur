import { DatesSetArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { useRecoilValue } from "recoil";

import { Calender, Modal } from "@/components/elements";
import { DayPayment } from "@/features/home/components/DayPayment";
import { useHome } from "@/features/home/hooks/use-home";
import { AuthState, authState } from "@/stores/auth";
import { getThisMonth } from "@/utils/date";

export const Home = () => {
  const auth = useRecoilValue<AuthState>(authState);

  const {
    events,
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
    targetMonth,
    setTargetMonth,
  } = useHome(auth.id);

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

      <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClose}
        style={{
          content: {
            left: 0,
            bottom: 0,
            width: "100%",
            borderRadius: "20px 20px 0 0",
          },
        }}
      >
        <DayPayment date={selectedDate} onCloseClick={handleModalClose} />
      </Modal>
    </>
  );
};

Home.displayName = "Home";
