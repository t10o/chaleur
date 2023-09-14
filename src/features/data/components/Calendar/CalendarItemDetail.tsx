import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Button } from "@/components/elements";
import { TimelineDetailItem } from "@/features/timeline/components/TimelineDetailItem";
import { PaymentsResponse } from "@/models/payments";
import { formatJpYmd } from "@/utils/date";

interface Props {
  data: PaymentsResponse;
  date: Date;
  onClose: () => void;
}

export const CalendarItemDetail = ({ data, date, onClose }: Props) => {
  const isWin = () => {
    return data.payback - data.pay >= 0;
  };

  const gambleData = () => {
    if (data.pachislo_payment_id) {
      return (
        <>
          <TimelineDetailItem
            label="店"
            value={data.pachislo_payments!.shop.name}
          />

          <TimelineDetailItem
            label="台"
            value={data.pachislo_payments!.machine.name}
          />

          <TimelineDetailItem
            label="レート"
            value={data.pachislo_payments!.rate.name}
          />
        </>
      );
    } else {
      return (
        <>
          <TimelineDetailItem
            label="会場"
            value={data.horserace_payments!.racecourse.name}
          />

          <TimelineDetailItem
            label="レース"
            value={data.horserace_payments!.race.name}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className={clsx("flex", "justify-between", "items-center", "mb-4")}>
        <div className={clsx("text-lg", "font-bold")}>{formatJpYmd(date)}</div>

        <Button onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>

      {gambleData()}

      <TimelineDetailItem label="投資" value={String(data.pay)} />

      <TimelineDetailItem label="回収" value={String(data.payback)} />

      <TimelineDetailItem
        label="収支"
        value={`${data.payback - data.pay}`}
        color={isWin() ? "text-green-500" : "text-red-500"}
      />

      <TimelineDetailItem label="メモ" value={String(data.memo)} />
    </>
  );
};

CalendarItemDetail.displayName = "CalendarItemDetail";
