import clsx from "clsx";
import React from "react";

import { Button, ButtonProps } from "./Button";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <Button
        className={clsx(
          "text-white",
          className,
          props.disabled ? "bg-gray-400" : "bg-primary"
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
