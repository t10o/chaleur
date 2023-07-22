import clsx from "clsx";
import React from "react";

import { lottery } from "@/utils/lottery";

import { Button, ButtonProps } from "./Button";

interface Props extends ButtonProps {
  isWin: boolean;
}

// 1/40 緑
// 1/111.1 紫
// 1/229 赤
// 1/319 虹
export const PremierButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = "", ...props }, ref) => {
    const color = () => {
      const isElection = lottery();

      console.log(isElection);

      switch (isElection) {
        case "lose":
          return "bg-primary";
        case "green":
          return "bg-green-500";
        case "purple":
          return "bg-purple-500";
        case "red":
          return "bg-red-500";
        case "rainbow":
          return [
            "bg-gradient-to-r",
            "from-green-500",
            "via-red-500",
            "to-blue-500",
          ];
        default:
          return "bg-primary";
      }
    };

    return (
      <Button
        className={clsx(
          "text-white",
          className,
          props.disabled ? "bg-gray-400" : props.isWin ? color() : "bg-primary",
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

PremierButton.displayName = "PremierButton";
