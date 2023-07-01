import { zodResolver } from "@hookform/resolvers/zod";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import * as z from "zod";

import { fetchUser } from "@/apis/users";
import { Input, PrimaryButton } from "@/components/elements";
import { AuthState, authState } from "@/stores/auth";
import { Database } from "@/types/schema";

interface SigninForm {
  email: string;
  password: string;
}

export const Signin = () => {
  const supabase = createPagesBrowserClient<Database>();

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

  const setUser = useSetRecoilState<AuthState>(authState);

  const onSubmit = async (data: SigninForm) => {
    try {
      const { data: loginUser, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (signInError) {
        throw new Error(`サインインに失敗しました：${signInError.message}`);
      }

      setUser({ session: loginUser.session });

      const { data: userData, error: userError } = await fetchUser(
        loginUser.user?.id
      );

      if (userError) {
        throw new Error(
          `ユーザー情報の取得に失敗しました：${userError.message}`
        );
      }

      if (!userData || !userData.length) {
        await router.push("/welcome");
      } else {
        await router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
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

      <PrimaryButton
        className={clsx("w-full", "text-lg", "mb-4")}
        type="submit"
        label="サインイン"
      />

      <Link
        className={clsx("flex", "justify-center", "items-center")}
        href="/auth/signup"
      >
        ユーザー登録がお済みでない方はこちらから
      </Link>
    </form>
  );
};

Signin.displayName = "Signin";
