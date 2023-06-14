import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";

interface Props {
  value: string;
  label: string;
  className?: string;
}

export const ToggleItem = ({ value, label, className }: Props) => {
  return (
    <RadixToggleGroup.Item
      className={clsx(
        "p-2",
        "border",
        "rounded-lg",
        "not-last:rounded-r-none",
        "not-first:rounded-l-none",
        "data-[state='on']:bg-primary",
        "data-[state='on']:text-white",
        className
      )}
      value={value}
    >
      {label}
    </RadixToggleGroup.Item>
  );
};

ToggleItem.displayName = "ToggleButton";
