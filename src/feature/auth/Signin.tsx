import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Input } from "@/components/elements";
import { supabase } from "@/lib/supabaseClient";

interface SigninForm {
  email: string;
  password: string;
}

export const Signin = () => {
  const schema = z.object({
    email: z
      .string()
      .email({ message: "Email：正しいメールアドレスを入力してください。" })
      .min(1, { message: "メールアドレスを入力してください。" }),
    password: z.string().min(1, { message: "パスワードを入力してください。" }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninForm>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: SigninForm) => {
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        throw signInError;
      }

      await router.push("/");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">メールアドレス</label>
      <Input
        id="email"
        className={clsx("w-full", !errors.email && "mb-4")}
        type="email"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.email.message as string}
        </p>
      )}

      <label htmlFor="password">パスワード</label>
      <Input
        id="password"
        className={clsx("w-full", !errors.password && "mb-4")}
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.password.message as string}
        </p>
      )}

      <Button
        className={clsx("w-full", "text-lg")}
        type="submit"
        label="Submit"
      />

      <Link href="/signup">ユーザー登録がお済みでない方はこちらから</Link>
    </form>
  );
};

Signin.displayName = "Signin";
