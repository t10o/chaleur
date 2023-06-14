import { ReactNode } from "react";
import { Controller } from "react-hook-form";

import { ToggleGroup } from "@/components/elements";

interface Props {
  className?: string;
  control: any;
  name: string;
  value?: string;
  defaultValue: string;
  children: ReactNode;
}

export const FormToggle = ({
  className,
  control,
  name,
  defaultValue,
  children,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref, ...props } }) => (
        <ToggleGroup
          {...props}
          ref={ref}
          className={className}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {children}
        </ToggleGroup>
      )}
    ></Controller>
  );
};

FormToggle.displayName = "FormToggle";
