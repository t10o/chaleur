import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button } from "@/components/elements";
import { HorseraceForm } from "@/features/home/components/HorseraceForm";
import { PachisloForm } from "@/features/home/components/PachisloForm";
import { PaymentsResponse } from "@/models/payments";
import { AuthState, authState } from "@/stores/auth";
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

  const auth = useRecoilValue<AuthState>(authState);

  useEffect(() => {
    if (data) {
      if (data.horserace_payment_id) {
        setGamble("horserace");
      } else {
        setGamble("pachislo");
      }
    } else {
      setGamble(auth.like as "pachislo" | "horserace");
    }
  }, [auth.like, data]);

  const isPachislo = gamble === "pachislo";

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: "pachislo" | "horserace",
  ) => {
    setGamble(value);
  };

  return (
    <>
      <p
        className={clsx(
          "flex",
          "justify-between",
          "items-center",
          "mb-8",
          "text-lg",
          "font-bold",
        )}
      >
        {formatJpYmd(date)}

        <Button onClick={onUpdated}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
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
