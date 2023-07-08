import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends Props {
  children?: ReactNode;
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", loadingLabel = "Loading...", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "py-2",
          "px-4",
          "rounded-lg",
          "text-center",
          className,
          props.loading && ["!bg-gray-400", "!text-white"],
        )}
        disabled={props.disabled || props.loading}
        {...props}
      >
        {props.loading ? loadingLabel : props.label || props.children}
      </button>
    );
  },
);

Button.displayName = "Button";
