import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export interface CalendarEvent {
  title: string;
  date: string;
}

interface Props {
  events?: CalendarEvent[];
  onDateClick: (dateClickArg: DateClickArg) => void;
}

export const Calender = ({ events, onDateClick }: Props) => {
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
      events={events}
      dateClick={handleDateClick}
    />
  );
};

Calender.displayName = "Calender";
