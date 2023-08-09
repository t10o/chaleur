import { zodResolver } from "@hookform/resolvers/zod";
import { InputLabel, ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { User } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { insertUser } from "@/apis/users";
import { Button, Input } from "@/components/elements";
import { WelcomeForm } from "@/models/users";

interface Props {
  user: User;
}

export const Welcome = ({ user }: Props) => {
  const schema = z.object({
    nickname: z.string().min(1, { message: "ニックネームを入力してください" }),
    like: z.string().min(1, { message: "どっちが好きか入力してください" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
  } = useForm<WelcomeForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      like: "pachislo",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: WelcomeForm) => {
    try {
      const { error } = await insertUser(data.nickname, data.like, user.id);

      if (error) {
        throw new Error(`ユーザー情報登録に失敗しました：${error.message}`);
      }

      await router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="nickname">ニックネームを教えてね</InputLabel>
        <Input
          id="nickname"
          className={clsx("w-full", !errors.nickname && "mb-4")}
          {...register("nickname", { required: true })}
        />
        {errors.nickname && (
          <p className={clsx("mb-4", "text-sm", "text-red-500")}>
            ※{errors.nickname.message as string}
          </p>
        )}

        <div className={clsx("flex", "flex-col", "mb-4")}>
          <InputLabel id="like">好きなギャンブルはどっち？</InputLabel>
          <Controller
            name="like"
            control={control}
            render={({ field }) => {
              return (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  color="primary"
                  onChange={(event, value) => {
                    setValue("like", value);
                  }}
                >
                  <ToggleButton value="pachislo">パチスロ</ToggleButton>

                  <ToggleButton value="horserace">競馬</ToggleButton>
                </ToggleButtonGroup>
              );
            }}
          />
        </div>

        <Button
          className={clsx("w-full", "bg-primary", "text-white")}
          type="submit"
          label="登録"
        />
      </form>
    </>
  );
};
