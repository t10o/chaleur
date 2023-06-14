import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { Button, Textarea, ToggleItem } from "@/components/elements";
import { Input } from "@/components/elements/Input";
import { FormToggle } from "@/components/elements/Toggle/FormToggle";

export const PachisloForm = () => {
  const schema = z.object({
    shop: z.string().min(1, { message: "店を入力してください。" }),
    kind: z.string().min(1, { message: "種類を入力してください" }),
    machine: z.string().min(1, { message: "台を入力してください" }),
    pay: z.string().min(1, { message: "投資を入力してください" }),
    payback: z.string().min(1, { message: "回収を入力してください" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    errors.shop && toast.error(errors.shop.message as string);
    errors.kind && toast.error(errors.kind.message as string);
    errors.machine && toast.error(errors.machine.message as string);
    errors.pay && toast.error(errors.pay.message as string);
    errors.payback && toast.error(errors.payback.message as string);
  }, [errors]);

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="shop">店</label>
      <Input
        id="shop"
        className={clsx("w-full", "mb-4")}
        {...register("shop", { required: true })}
      />

      <label htmlFor="kind">種類</label>
      <FormToggle
        className={clsx("w-full", "mb-4")}
        control={control}
        name="kind"
        defaultValue="パチンコ"
      >
        <ToggleItem value="パチンコ" />
        <ToggleItem value="スロット" />
      </FormToggle>

      <label htmlFor="machine">台</label>
      <Input
        id="machine"
        className={clsx("w-full", "mb-4")}
        {...register("machine", { required: true })}
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

PachisloForm.displayName = "PachisloForm";
