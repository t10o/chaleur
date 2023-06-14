import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";

interface Props {
  value: string;
}

export const ToggleItem = ({ value }: Props) => {
  return (
    <RadixToggleGroup.Item
      className={clsx(
        "p-2",
        "border",
        "rounded-lg",
        "not-last:rounded-r-none",
        "not-first:rounded-l-none",
        "data-[state='on']:bg-primary",
        "data-[state='on']:text-white"
      )}
      value={value}
    >
      {value}
    </RadixToggleGroup.Item>
  );
};

ToggleItem.displayName = "ToggleButton";
