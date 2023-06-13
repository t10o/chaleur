import { DateClickArg } from "@fullcalendar/interaction";

import { Calender } from "@/components/elements";

export const Home = () => {
  const handleClick = (arg: DateClickArg) => {
    console.log(arg.dateStr);
  };

  return <Calender onDateClick={handleClick} />;
};

Home.displayName = "Home";
