import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import * as z from "zod";

import { insertMachineMaster } from "@/apis/machine";
import { insertPachoslo, updatePachislo } from "@/apis/pachisloPayments";
import {
  insertPaymentForPachoslo,
  updatePaymentForPachoslo,
} from "@/apis/payments";
import { insertShopMaster } from "@/apis/shop";
import { PremierButton, Textarea } from "@/components/elements";
import { Input } from "@/components/elements/Input";
import { usePachisloForm } from "@/features/home/hooks/use-pachislo-form";
import { PachisloFormValue } from "@/models/pachislo";
import { PaymentsResponse } from "@/models/payments";
import { AuthState, authState } from "@/stores/auth";

interface Props {
  data?: PaymentsResponse;
  date: Date;
  onUpdated: () => void;
}

export const PachisloForm = ({ data = undefined, date, onUpdated }: Props) => {
  const schema = z.object({
    shop: z.string().min(1, { message: "店を入力してください" }),
    machine: z.string().min(1, { message: "台を入力してください" }),
    kind: z.string(),
    pay: z.preprocess(
      (v) => Number(v),
      z.number().min(0, { message: "投資を入力してください" }),
    ),
    payback: z.preprocess(
      (v) => Number(v),
      z.number().min(0, { message: "回収を入力してください" }),
    ),
    memo: z.string().optional(),
    rate: z.string().min(1, { message: "レートを選んでください" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    watch,
    setValue,
  } = useForm<PachisloFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      shop: data && data.pachislo_payments?.shop.name,
      kind: data ? data.pachislo_payments?.kind : "pachinko",
      machine: data && data.pachislo_payments?.machine.name,
      pay: data && `${data.pay}`,
      payback: data && `${data.payback}`,
      memo: data && data.memo ? data.memo : undefined,
      // TODO: 初期値をkindによって変えたい
      rate: data ? `${data.pachislo_payments?.rate.id}` : "1",
    },
  });

  const {
    machineMaster,
    machineNames,
    shopMaster,
    shopNames,
    rateMaster,
    isLoading,
    setIsLoading,
  } = usePachisloForm();

  const auth = useRecoilValue<AuthState>(authState);

  const watchKind = watch("kind");
  const watchPay = watch("pay");
  const watchPayback = watch("payback");

  const isWin = Number(watchPayback) - Number(watchPay) > 0;

  const isPachinko = () => {
    return watchKind === "pachinko";
  };

  const filteredMachineMaster = () => {
    return machineMaster!.filter((machineMaster) => {
      return machineMaster.is_pachinko === isPachinko();
    });
  };

  const filteredRateMaster = () => {
    return rateMaster!.filter((rateMaster) => {
      return rateMaster.is_pachinko === isPachinko();
    });
  };

  const onSubmit: SubmitHandler<PachisloFormValue> = async (
    formData: PachisloFormValue,
  ) => {
    setIsLoading(true);

    try {
      if (!machineNames!.includes(formData.machine)) {
        const error = await insertMachineMaster(
          formData.machine,
          formData.kind,
        );

        if (error) {
          setIsLoading(false);

          throw new Error(`台マスタの保存に失敗しました：${error.message}`);
        }
      }

      if (!shopNames!.includes(formData.shop)) {
        const error = await insertShopMaster(formData.shop);

        if (error) {
          setIsLoading(false);

          throw new Error(`店マスタの保存に失敗しました：${error.message}`);
        }
      }

      const { data: pachisloData, error: pachisloError } = data
        ? await updatePachislo(data.pachioslo_payment_id!, formData)
        : await insertPachoslo(formData);

      if (pachisloError) {
        setIsLoading(false);

        throw new Error(
          `パチスロ収支の保存に失敗しました：${pachisloError.message}`,
        );
      }

      const { error } = data
        ? await updatePaymentForPachoslo(
            data.id,
            formData,
            pachisloData![0].id,
            date,
            auth.id,
          )
        : await insertPaymentForPachoslo(
            formData,
            pachisloData![0].id,
            date,
            auth.id,
          );

      if (error) {
        setIsLoading(false);

        throw new Error(`収支の保存に失敗しました：${error.message}`);
      }

      onUpdated();
      toast.success("保存しました");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const shopInput = shopMaster ? (
    <Controller
      name="shop"
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            className={clsx(!errors.shop && "mb-4", "rounded-lg")}
            freeSolo
            options={shopMaster!.map((shopMaster) => shopMaster.name)}
            {...field}
            renderInput={(params: any) => (
              <TextField
                className={clsx("w-full")}
                {...params}
                onChange={(event) => {
                  setValue("shop", event.target.value);
                }}
              />
            )}
            onChange={(event, value) => {
              setValue("shop", value!);
            }}
          />
        );
      }}
    />
  ) : (
    <Input
      id="shop"
      className={clsx("w-full", !errors.shop && "mb-4")}
      {...register("shop", { required: true })}
    />
  );

  const machineInput = machineMaster ? (
    <Controller
      name="machine"
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            className={clsx(!errors.shop && "mb-4", "rounded-lg")}
            freeSolo
            options={filteredMachineMaster()!.map(
              (machineMaster) => machineMaster.name,
            )}
            {...field}
            renderInput={(params: any) => (
              <TextField
                className={clsx("w-full")}
                {...params}
                onChange={(event) => {
                  setValue("machine", event.target.value);
                }}
              />
            )}
            onChange={(event, value) => {
              setValue("machine", value!);
            }}
          />
        );
      }}
    />
  ) : (
    <Input
      id="machine"
      className={clsx("w-full", !errors.machine && "mb-4")}
      {...register("machine", { required: true })}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel id="shop">店</InputLabel>
      {shopInput}
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
              <ToggleButtonGroup
                {...field}
                exclusive
                color="primary"
                onChange={(event, value) => {
                  setValue("kind", value);
                }}
              >
                <ToggleButton value="pachinko">パチンコ</ToggleButton>

                <ToggleButton value="slot">スロット</ToggleButton>
              </ToggleButtonGroup>
            );
          }}
        />
      </div>

      <InputLabel id="machine">台</InputLabel>
      {machineInput}
      {errors.machine && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.machine.message as string}
        </p>
      )}

      <InputLabel id="rate">レート</InputLabel>
      <Controller
        name="rate"
        control={control}
        render={({ field }) => {
          return (
            <Select
              className={clsx(!errors.rate && "mb-4")}
              labelId="rate"
              id="rate"
              label="レート"
              {...field}
              onChange={(event) => {
                setValue("rate", event.target.value);
              }}
            >
              {rateMaster &&
                filteredRateMaster().map((rate) => {
                  return (
                    <MenuItem key={rate.id} value={`${rate.id}`}>
                      {rate.name}
                    </MenuItem>
                  );
                })}
            </Select>
          );
        }}
      />
      {errors.rate && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.rate.message as string}
        </p>
      )}

      <InputLabel id="pay">投資</InputLabel>
      <Input
        id="pay"
        type="number"
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
        type="number"
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

      <PremierButton
        className={clsx("w-full")}
        isWin={isWin}
        type="submit"
        label="登録"
        loading={isLoading}
        loadingLabel="登録中..."
      />
    </form>
  );
};

PachisloForm.displayName = "PachisloForm";
