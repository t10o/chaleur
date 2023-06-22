import clsx from "clsx";
import React from "react";

import { Button, ButtonProps } from "./Button";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <Button
        className={clsx("bg-primary", "text-white", className)}
        {...props}
        ref={ref}
      />
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
