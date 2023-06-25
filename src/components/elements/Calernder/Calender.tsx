import { DatesSetArg } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";

export interface CalendarEvent {
  title: string;
  date: string;
}

interface Props {
  events?: CalendarEvent[];
  onDateClick: (dateClickArg: DateClickArg) => void;
  onDatasetChange: (datesSetArg: DatesSetArg) => void;
}

export const Calender = ({ events, onDateClick, onDatasetChange }: Props) => {
  const ref = useRef<FullCalendar>(null!);

  const handleDateClick = (arg: DateClickArg) => {
    onDateClick(arg);
  };

  const handleDatesChange = (arg: DatesSetArg) => {
    onDatasetChange(arg);
  };

  return (
    <FullCalendar
      ref={ref}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale="ja"
      height="auto"
      events={events}
      dateClick={handleDateClick}
      datesSet={handleDatesChange}
    />
  );
};

Calender.displayName = "Calender";
