import clsx from "clsx";

interface Props {
  label: string;
  value: string;
  color?: string;
}

export const TimelineDetailItem = ({ label, value, color = "" }: Props) => {
  return (
    <div className={clsx("flex", "justify-start", "flex-col", "mb-4")}>
      <div className={clsx("font-bold", "mb-1")}>{label}</div>
      <div className={clsx("whitespace-pre-wrap", color)}>{value}</div>
    </div>
  );
};

TimelineDetailItem.displayName = "TimelineDetailItem";
