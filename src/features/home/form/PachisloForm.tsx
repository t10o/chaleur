import { zodResolver } from "@hookform/resolvers/zod";
import { InputLabel, ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import * as z from "zod";

import { Button, Textarea } from "@/components/elements";
import { Input } from "@/components/elements/Input";
import { useMachineMaster } from "@/hooks/use-machine-master";
import { usePachislo } from "@/hooks/use-pachislo";
import { usePayments } from "@/hooks/use-payments";
import { useShopMaster } from "@/hooks/use-shop-master";
import { PachisloFormValue } from "@/models/pachislo";
import { AuthState, authState } from "@/stores/auth";

interface Props {
  date: Date;
}

export const PachisloForm = ({ date }: Props) => {
  const schema = z.object({
    shop: z.string().min(1, { message: "店を入力してください。" }),
    machine: z.string().min(1, { message: "台を入力してください" }),
    kind: z.string(),
    pay: z.string().min(1, { message: "投資を入力してください" }),
    payback: z.string().min(1, { message: "回収を入力してください" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<PachisloFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      kind: "pachinko",
    },
  });

  const {
    machineMaster,
    machineNames,
    error: machineError,
    insertMachineMaster,
  } = useMachineMaster();

  const {
    shopMaster,
    shopNames,
    error: shopError,
    insertShopMaster,
  } = useShopMaster();

  const { insertPachoslo } = usePachislo();

  const { insertPaymentForPachoslo } = usePayments();

  const auth = useRecoilValue<AuthState>(authState);

  if (machineError || !machineNames || !machineMaster) {
    return <div>Error: Machine Master Fetch Failed</div>;
  }

  if (shopError || !shopNames || !shopMaster) {
    return <div>Error: Shop Master Fetch Failed</div>;
  }

  const onSubmit: SubmitHandler<PachisloFormValue> = async (
    data: PachisloFormValue
  ) => {
    try {
      if (!machineNames.includes(data.machine)) {
        const error = await insertMachineMaster(data.machine, data.kind);

        if (error) throw error;
      }

      if (!shopNames.includes(data.shop)) {
        const error = await insertShopMaster(data.shop);

        if (error) throw error;
      }

      const { data: pachisloData, error: pachisloError } = await insertPachoslo(
        data,
        machineMaster,
        shopMaster
      );

      if (pachisloError) throw pachisloError;

      const { error } = await insertPaymentForPachoslo(
        data,
        pachisloData![0].id,
        date,
        auth.user.id
      );

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel id="shop">店</InputLabel>
      <Input
        id="shop"
        className={clsx("w-full", !errors.shop && "mb-4")}
        {...register("shop", { required: true })}
      />
      {errors.shop && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.shop.message as string}
        </p>
      )}

      <div className={clsx("flex", "flex-col", "mb-4")}>
        <InputLabel id="kind">種類</InputLabel>
        <Controller
          name="kind"
          control={control}
          render={({ field }) => {
            return (
              <ToggleButtonGroup {...field} exclusive color="primary">
                <ToggleButton value="pachinko">パチンコ</ToggleButton>

                <ToggleButton value="slot">スロット</ToggleButton>
              </ToggleButtonGroup>
            );
          }}
        />
      </div>

      <InputLabel id="machine">台</InputLabel>
      <Input
        id="machine"
        className={clsx("w-full", !errors.machine && "mb-4")}
        {...register("machine", { required: true })}
      />
      {errors.machine && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.machine.message as string}
        </p>
      )}

      <InputLabel id="pay">投資</InputLabel>
      <Input
        id="pay"
        className={clsx("w-full", !errors.pay && "mb-4")}
        {...register("pay", { required: true })}
      />
      {errors.pay && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.pay.message as string}
        </p>
      )}

      <InputLabel id="payback">回収</InputLabel>
      <Input
        id="payback"
        className={clsx("w-full", !errors.payback && "mb-4")}
        {...register("payback", { required: true })}
      />
      {errors.payback && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.payback.message as string}
        </p>
      )}

      <InputLabel id="memo">メモ</InputLabel>
      <Textarea
        id="memo"
        className={clsx("w-full", "mb-4")}
        {...register("memo", { required: true })}
      />

      <Button
        className={clsx("w-full", "text-lg")}
        type="submit"
        label="Submit"
      />
    </form>
  );
};

PachisloForm.displayName = "PachisloForm";
