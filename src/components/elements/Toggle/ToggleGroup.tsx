import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
  value?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
}

export const ToggleGroup = React.forwardRef<HTMLInputElement, Props>(
  ({ className, children, value, defaultValue, onChange }: Props, ref) => {
    return (
      <RadixToggleGroup.Root
        ref={ref}
        className={clsx(className)}
        value={value}
        type="single"
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        {children}
      </RadixToggleGroup.Root>
    );
  }
);

ToggleGroup.displayName = "ToggleButtonGroup";
