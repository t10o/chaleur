import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Button } from "@/components/elements";
import { TimelineItemDetailTh } from "@/features/timeline/components/TimelineItemDetailTh";
import { formatJpYmd } from "@/utils/date";

interface Props {
  data: any;
  onClose: () => void;
}

export const TimelineItemDetail = ({ data, onClose }: Props) => {
  const isWin = () => {
    return data.payback - data.pay >= 0;
  };

  const gambleData = () => {
    if (data.pachioslo_payment_id) {
      return (
        <>
          <tr>
            <TimelineItemDetailTh>店</TimelineItemDetailTh>
            <td>{data.pachislo_payments.shop.name}</td>
          </tr>

          <tr>
            <TimelineItemDetailTh>台</TimelineItemDetailTh>
            <td>{data.pachislo_payments.machine.name}</td>
          </tr>

          <tr>
            <TimelineItemDetailTh>レート</TimelineItemDetailTh>
            <td>{data.pachislo_payments.rate.name}</td>
          </tr>
        </>
      );
    } else {
      return (
        <>
          <tr>
            <TimelineItemDetailTh>会場</TimelineItemDetailTh>
            <td>{data.horserace_payments.racecourse.name}</td>
          </tr>

          <tr>
            <TimelineItemDetailTh>レース</TimelineItemDetailTh>
            <td>{data.horserace_payments.race.name}</td>
          </tr>
        </>
      );
    }
  };

  return (
    <>
      <p
        className={clsx(
          "flex",
          "justify-between",
          "items-center",
          "mb-6",
          "text-lg",
          "font-bold",
        )}
      >
        {formatJpYmd(new Date(data.date))}

        <Button onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </p>

      <div className={clsx("mb-4", "font-bold")}>
        {data.general_users.nickname}
      </div>

      <table>
        <tbody>
          <>{gambleData()}</>

          <tr>
            <TimelineItemDetailTh>投資</TimelineItemDetailTh>
            <td>{data.pay}</td>
          </tr>

          <tr>
            <TimelineItemDetailTh>回収</TimelineItemDetailTh>
            <td>{data.payback}</td>
          </tr>

          <tr>
            <TimelineItemDetailTh>収支</TimelineItemDetailTh>
            <td className={clsx(isWin() ? "text-green-500" : "text-red-500")}>
              {data.payback - data.pay}
            </td>
          </tr>

          {data.memo && (
            <tr>
              <TimelineItemDetailTh>メモ</TimelineItemDetailTh>
              <td>{data.memo}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

TimelineItemDetail.displayName = "TimelineItemDetail";
