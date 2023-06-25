import { zodResolver } from "@hookform/resolvers/zod";
import { InputLabel, MenuItem, Select } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import * as z from "zod";

import { Button, Input, Textarea } from "@/components/elements";
import { useHorserace } from "@/hooks/use-horserace";
import { usePayments } from "@/hooks/use-payments";
import { useRace } from "@/hooks/use-race";
import { useRacecourse } from "@/hooks/use-racecourse";
import { HorseraceFormValue } from "@/models/horserace";
import { AuthState, authState } from "@/stores/auth";

interface Props {
  date: Date;
}

export const HorseRacingForm = ({ date }: Props) => {
  const schema = z.object({
    racecourse: z.string().min(1, { message: "会場を入力してください。" }),
    race: z.string().min(1, { message: "レースを入力してください" }),
    pay: z.string().min(1, { message: "投資を入力してください" }),
    payback: z.string().min(1, { message: "回収を入力してください" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<HorseraceFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      racecourse: "1",
      race: "1",
    },
  });

  const { racecourseMaster, error: racecourseError } = useRacecourse();

  const { raceMaster, error: raceError } = useRace();

  const { insertHorserace } = useHorserace();

  const { insertPaymentForHorserace } = usePayments(date);

  const auth = useRecoilValue<AuthState>(authState);

  if (racecourseError || !racecourseMaster) {
    return <div>Error: Racecourse Master Fetch Failed</div>;
  }

  if (raceError || !raceMaster) {
    return <div>Error: Race Master Fetch Failed</div>;
  }

  const onSubmit: SubmitHandler<HorseraceFormValue> = async (
    data: HorseraceFormValue
  ) => {
    try {
      const { data: horseraceData, error: horseraceError } =
        await insertHorserace(data);

      if (horseraceError) throw horseraceError;

      const { error } = await insertPaymentForHorserace(
        data,
        horseraceData![0].id,
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
            >
              {racecourseMaster.map((racecourse) => {
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
            >
              {raceMaster.map((race) => {
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

HorseRacingForm.displayName = "HorseRacingForm";
