import clsx from "clsx";
import React from "react";

import { Button, ButtonProps } from "./Button";

export const AccentButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <Button
        className={clsx("bg-accent", "text-white", className)}
        {...props}
        ref={ref}
      />
    );
  },
);

AccentButton.displayName = "AccentButton";
