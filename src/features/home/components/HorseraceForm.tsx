import { zodResolver } from "@hookform/resolvers/zod";
import { InputLabel, MenuItem, Select } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import * as z from "zod";

import { Input, PremierButton, Textarea } from "@/components/elements";
import { useHorseraceForm } from "@/features/home/hooks/use-horserace-form";
import { submitHorserace } from "@/features/home/repositories/horserace";
import { HorseraceFormValue } from "@/models/horserace";
import { PaymentsResponse } from "@/models/payments";
import { AuthState, authState } from "@/stores/auth";

interface Props {
  data?: PaymentsResponse;
  date: Date;
  onUpdated: () => void;
}

export const HorseraceForm = ({ data = undefined, date, onUpdated }: Props) => {
  const schema = z.object({
    racecourse: z.string().min(1, { message: "会場を入力してください。" }),
    race: z.string().min(1, { message: "レースを入力してください" }),
    pay: z.preprocess(
      (v) => Number(v),
      z.number().min(0, { message: "投資を入力してください" }),
    ),
    payback: z.preprocess(
      (v) => Number(v),
      z.number().min(0, { message: "回収を入力してください" }),
    ),
    memo: z.string().optional(),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
    watch,
  } = useForm<HorseraceFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      racecourse: data ? `${data.horserace_payments?.racecourse.id}` : "1",
      race: data ? `${data.horserace_payments?.race.id}` : "1",
      pay: data && `${data.pay}`,
      payback: data && `${data.payback}`,
      memo: data && data.memo ? data.memo : undefined,
    },
  });

  const { raceMaster, racecourseMaster, isLoading, setIsLoading } =
    useHorseraceForm();

  const auth = useRecoilValue<AuthState>(authState);

  const watchPay = watch("pay");
  const watchPayback = watch("payback");

  const isWin = Number(watchPayback) - Number(watchPay) > 0;

  const onSubmit: SubmitHandler<HorseraceFormValue> = async (
    formData: HorseraceFormValue,
  ) => {
    setIsLoading(true);

    try {
      await submitHorserace(formData, auth.id, date, data);

      onUpdated();
      toast.success("保存しました");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel id="racecourse">会場</InputLabel>
      <Controller
        name="racecourse"
        control={control}
        render={({ field }) => {
          return (
            <Select
              className={clsx(!errors.racecourse && "mb-4")}
              labelId="racecourse"
              id="racecourse"
              label="会場"
              {...field}
              onChange={(event) => {
                setValue("racecourse", event.target.value);
              }}
            >
              {racecourseMaster &&
                racecourseMaster.map((racecourse) => {
                  return (
                    <MenuItem key={racecourse.id} value={`${racecourse.id}`}>
                      {racecourse.name}
                    </MenuItem>
                  );
                })}
            </Select>
          );
        }}
      />
      {errors.racecourse && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.racecourse.message as string}
        </p>
      )}

      <InputLabel id="race">レース</InputLabel>
      <Controller
        name="race"
        control={control}
        render={({ field }) => {
          return (
            <Select
              className={clsx(!errors.race && "mb-4")}
              labelId="race"
              id="race"
              label="会場"
              {...field}
              onChange={(event) => {
                setValue("race", event.target.value);
              }}
            >
              {raceMaster &&
                raceMaster.map((race) => {
                  return (
                    <MenuItem key={race.id} value={`${race.id}`}>
                      {race.name}
                    </MenuItem>
                  );
                })}
            </Select>
          );
        }}
      />
      {errors.race && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.race.message as string}
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
        className={clsx("w-full", "mb-4", "h-32")}
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

HorseraceForm.displayName = "HorseRacingForm";
