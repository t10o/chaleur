import { zodResolver } from "@hookform/resolvers/zod";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input, PrimaryButton } from "@/components/elements";
import { Database } from "@/types/schema";

interface SignupForm {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const Signup = () => {
  const supabase = createPagesBrowserClient<Database>();

  const schema = z
    .object({
      email: z
        .string()
        .email({ message: "Email：正しいメールアドレスを入力してください。" })
        .min(1, { message: "メールアドレスを入力してください。" }),
      password: z
        .string()
        .min(8, { message: "8文字以上のパスワードを入力してください" }),
      passwordConfirmation: z
        .string()
        .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .superRefine(({ password, passwordConfirmation }, ctx) => {
      if (password !== passwordConfirmation) {
        ctx.addIssue({
          path: ["passwordConfirmation"],
          code: "custom",
          message: "パスワードが一致しません",
        });
      }
    });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) {
        throw signUpError;
      }

      alert("登録完了メールを確認してください");
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

      <label htmlFor="passwordConfirmation">パスワード（確認）</label>
      <Input
        id="passwordConfirmation"
        className={clsx("w-full", !errors.passwordConfirmation && "mb-4")}
        type="password"
        {...register("passwordConfirmation", { required: true })}
      />
      {errors.passwordConfirmation && (
        <p className={clsx("mb-4", "text-sm", "text-red-500")}>
          ※{errors.passwordConfirmation.message as string}
        </p>
      )}

      <PrimaryButton
        className={clsx("w-full", "text-lg")}
        type="submit"
        label="サインアップ"
      />
    </form>
  );
};

Signup.displayName = "Signup";
