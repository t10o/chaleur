import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
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

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div></div>
      <label htmlFor="racecourse">会場</label>
      <Input
        id="racecourse"
        className={clsx("w-full", !errors.racecourse && "mb-4")}
        {...register("kind", { required: true })}
      />
      {errors.racecourse && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.racecourse.message as string}
        </p>
      )}

      <label htmlFor="race">レース</label>
      <Input
        id="race"
        className={clsx("w-full", !errors.race && "mb-4")}
        {...register("kind", { required: true })}
      />
      {errors.race && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.race.message as string}
        </p>
      )}

      <label htmlFor="pay">投資</label>
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

      <label htmlFor="payback">回収</label>
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
