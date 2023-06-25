import clsx from "clsx";

import { Button } from "@/components/elements";
import { PaymentsResponse } from "@/models/payments";

interface Props {
  data: PaymentsResponse;
}

export const HorseraceListItem = ({ data }: Props) => {
  const isWin = (payment: number) => {
    return payment >= 0;
  };

  return (
    <div className={clsx("mb-7")}>
      <div className={clsx("flex", "justify-between", "items-center", "mb-3")}>
        <div className={clsx("flex", "flex-col")}>
          <p>{data.horserace_payments?.racecourse.name}</p>
          <p>{data.horserace_payments?.race.name}</p>
        </div>

        <div className={clsx("flex", "flex-col")}>
          <p>投資: {data.pay}</p>
          <p>回収: {data.payback}</p>
          <p
            className={clsx(
              isWin(data.payback - data.pay)
                ? "text-emerald-600"
                : "text-red-600"
            )}
          >
            収支: {data.payback - data.pay}
          </p>
        </div>
      </div>

      <div className={clsx("flex", "justify-between", "items-center")}>
        <Button
          className={clsx(
            "w-1/2",
            "bg-accent",
            "text-white",
            "text-sm",
            "mr-2"
          )}
          label="削除"
        />
        <Button
          className={clsx("w-1/2", "bg-primary", "text-white", "text-sm")}
          label="編集"
        />
      </div>
    </div>
  );
};

HorseraceListItem.displayName = "HorseraceListItem";
