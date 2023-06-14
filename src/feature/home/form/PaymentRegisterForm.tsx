import clsx from "clsx";
import { useState } from "react";

import { ToggleGroup, ToggleItem } from "@/components/elements";
import { HorseRacingForm } from "@/feature/home/form/HorseRacingForm";
import { PachisloForm } from "@/feature/home/form/PachisloForm";
import { format } from "@/utils/date";

interface Props {
  date: Date;
}

export const PaymentRegisterForm = ({ date }: Props) => {
  const [gamble, setGamble] = useState("pachislo");

  const isPachislo = gamble === "pachislo";

  const handleChange = (gamble: string) => {
    setGamble(gamble);
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

      <ToggleGroup
        className={clsx("flex", "justify-center", "items-center", "mb-8")}
        defaultValue="pachislo"
        onChange={handleChange}
      >
        <ToggleItem
          className={clsx("w-32")}
          value="pachislo"
          label="パチスロ"
        />
        <ToggleItem className={clsx("w-32")} value="horserace" label="競馬" />
      </ToggleGroup>

      {isPachislo ? <PachisloForm /> : <HorseRacingForm />}
    </>
  );
};

PaymentRegisterForm.displayName = "PaymentRegisterForm";
