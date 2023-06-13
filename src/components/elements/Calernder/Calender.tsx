import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface Props {
  onDateClick: (dateClickArg: DateClickArg) => void;
}

export const Calender = ({ onDateClick }: Props) => {
  const handleDateClick = (arg: DateClickArg) => {
    onDateClick(arg);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale="ja"
      height="auto"
      dateClick={handleDateClick}
    />
  );
};

Calender.displayName = "Calender";
