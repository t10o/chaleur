import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { HorseraceForm } from "@/features/home/HorseraceForm";
import { PachisloForm } from "@/features/home/PachisloForm";
import { PaymentsResponse } from "@/models/payments";
import { formatJpYmd } from "@/utils/date";

interface Props {
  data?: PaymentsResponse;
  date: Date;
  onUpdated: () => void;
}

export const PaymentRegisterForm = ({
  data = undefined,
  date,
  onUpdated,
}: Props) => {
  const [gamble, setGamble] = useState<"pachislo" | "horserace">("pachislo");

  useEffect(() => {
    if (data) {
      if (data.horserace_payment_id) {
        setGamble("horserace");
      } else {
        setGamble("pachislo");
      }
    }
  }, []);

  const isPachislo = gamble === "pachislo";

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: "pachislo" | "horserace"
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
        {formatJpYmd(date)}
      </p>

      <ToggleButtonGroup
        className={clsx("flex", "justify-center", "items-center", "mb-8")}
        value={gamble}
        exclusive
        color="primary"
        disabled={!!data}
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
        <PachisloForm data={data} date={date} onUpdated={onUpdated} />
      ) : (
        <HorseraceForm data={data} date={date} onUpdated={onUpdated} />
      )}
    </>
  );
};

PaymentRegisterForm.displayName = "PaymentRegisterForm";
