import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { Button, Input, Textarea } from "@/components/elements";

export const HorseRacingForm = () => {
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
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    errors.racecourse && toast.error(errors.racecourse.message as string);
    errors.race && toast.error(errors.race.message as string);
    errors.pay && toast.error(errors.pay.message as string);
    errors.payback && toast.error(errors.payback.message as string);
  }, [errors]);

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div></div>
      <label htmlFor="racecourse">会場</label>
      <Input
        id="racecourse"
        className={clsx("w-full", "mb-4")}
        {...register("kind", { required: true })}
      />

      <label htmlFor="race">レース</label>
      <Input
        id="race"
        className={clsx("w-full", "mb-4")}
        {...register("kind", { required: true })}
      />

      <label htmlFor="pay">投資</label>
      <Input
        id="pay"
        className={clsx("w-full", "mb-4")}
        {...register("pay", { required: true })}
      />

      <label htmlFor="payback">回収</label>
      <Input
        id="payback"
        className={clsx("w-full", "mb-4")}
        {...register("payback", { required: true })}
      />

      <label htmlFor="memo">メモ</label>
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
