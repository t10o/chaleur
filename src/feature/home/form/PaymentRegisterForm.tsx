import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import { useState } from "react";

import { HorseRacingForm } from "@/feature/home/form/HorseRacingForm";
import { PachisloForm } from "@/feature/home/form/PachisloForm";
import { format } from "@/utils/date";

interface Props {
  date: Date;
}

export const PaymentRegisterForm = ({ date }: Props) => {
  const [gamble, setGamble] = useState("pachislo");

  const isPachislo = gamble === "pachislo";

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setGamble(value);
  };

  return (
    <>
      <p
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "mb-8",
          "text-lg",
          "font-bold"
        )}
      >
        {format(date)}
      </p>

      <ToggleButtonGroup
        className={clsx("flex", "justify-center", "items-center", "mb-8")}
        value={gamble}
        exclusive
        color="primary"
        onChange={handleChange}
      >
        <ToggleButton className={clsx("w-32")} value="pachislo">
          パチスロ
        </ToggleButton>

        <ToggleButton className={clsx("w-32")} value="horserace">
          競馬
        </ToggleButton>
      </ToggleButtonGroup>

      {isPachislo ? (
        <PachisloForm date={date} />
      ) : (
        <HorseRacingForm date={date} />
      )}
    </>
  );
};

PaymentRegisterForm.displayName = "PaymentRegisterForm";
