import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Textarea, ToggleItem } from "@/components/elements";
import { Input } from "@/components/elements/Input";
import { FormToggle } from "@/components/elements/Toggle/FormToggle";

export const PachisloForm = () => {
  const schema = z.object({
    shop: z.string().min(1, { message: "店を入力してください。" }),
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

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="shop">店</label>
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

      <label htmlFor="kind">種類</label>
      <FormToggle
        className={clsx("w-full", "mb-4")}
        control={control}
        name="kind"
        defaultValue="pachinko"
      >
        <ToggleItem value="pachinko" label="パチンコ" />
        <ToggleItem value="slot" label="スロット" />
      </FormToggle>

      <label htmlFor="machine">台</label>
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

PachisloForm.displayName = "PachisloForm";
