import { TimelineContent } from "@mui/lab";
import clsx from "clsx";

interface Props {
  data: any;
  onClick: (data: any) => void;
}

export const TimelineItem = ({ data, onClick }: Props) => {
  const payment = data.payback - data.pay;
  const isWin = payment >= 0;

  const gambleData = () => {
    if (data.pachioslo_payment_id) {
      return data.pachislo_payments.machine.name;
    } else {
      return `${data.horserace_payments.racecourse.name} ${data.horserace_payments.race.name}`;
    }
  };

  return (
    <TimelineContent
      className={clsx("flex", "flex-col")}
      onClick={() => onClick(data)}
    >
      <div className={clsx("mb-2", "font-bold")}>
        {data.general_users.nickname}
      </div>

      <div className={clsx("mb-1")}>{gambleData()}</div>

      <div className={clsx(isWin ? "text-green-500" : "text-red-500")}>
        {payment}
      </div>
    </TimelineContent>
  );
};

TimelineItem.displayName = "TimelineItem";
