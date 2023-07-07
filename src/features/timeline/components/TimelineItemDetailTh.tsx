import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TimelineItemDetailTh = ({ children }: Props) => {
  return <th className={clsx("min-w-[80px]", "text-left")}>{children}</th>;
};

TimelineItemDetailTh.displayName = "TimelineItemDetailTh";
