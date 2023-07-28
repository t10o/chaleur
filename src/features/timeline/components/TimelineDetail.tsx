import clsx from "clsx";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { Button } from "@/components/elements";
import { TimelineDetailItem } from "@/features/timeline/components/TimelineDetailItem";
import {
  TimelineState,
  timelineState,
} from "@/features/timeline/stores/timeline";
import { formatJpYmd } from "@/utils/date";

export const TimelineDetail = () => {
  const { timelineDetail } = useRecoilValue<TimelineState>(timelineState);
  const router = useRouter();

  const isWin = () => {
    return timelineDetail.payback - timelineDetail.pay >= 0;
  };

  const handleClick = async () => {
    await router.push("/timeline");
  };

  const gambleData = () => {
    if (timelineDetail.pachioslo_payment_id) {
      return (
        <>
          <TimelineDetailItem
            label="店"
            value={timelineDetail.pachislo_payments.shop.name}
          />

          <TimelineDetailItem
            label="台"
            value={timelineDetail.pachislo_payments.machine.name}
          />

          <TimelineDetailItem
            label="レート"
            value={timelineDetail.pachislo_payments.rate.name}
          />
        </>
      );
    } else {
      return (
        <>
          <TimelineDetailItem
            label="会場"
            value={timelineDetail.horserace_payments.racecourse.name}
          />

          <TimelineDetailItem
            label="レース"
            value={timelineDetail.horserace_payments.race.name}
          />
        </>
      );
    }
  };

  return (
    <>
      <p
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "mb-6",
          "text-lg",
        )}
      >
        {formatJpYmd(new Date(timelineDetail.date))}
      </p>

      <TimelineDetailItem
        label="プレイヤー"
        value={timelineDetail.general_users.nickname}
      />

      {gambleData()}

      <TimelineDetailItem label="投資" value={timelineDetail.pay} />

      <TimelineDetailItem label="回収" value={timelineDetail.payback} />

      <TimelineDetailItem
        label="収支"
        value={`${timelineDetail.payback - timelineDetail.pay}`}
        color={isWin() ? "text-green-500" : "text-red-500"}
      />

      <TimelineDetailItem label="メモ" value={timelineDetail.memo} />

      <Button className={clsx("!pl-0", "mt-4")} onClick={handleClick}>
        ＜ 戻る
      </Button>
    </>
  );
};

TimelineDetail.displayName = "TimelineItemDetail";
