import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { Home } from "@/features/home";
import { useUser } from "@/hooks/use-user";
import { AuthState, authState } from "@/stores/auth";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function HomePage({ user }: Props) {
  const { user: loginUser } = useUser(user.id);
  const setUser = useSetRecoilState<AuthState>(authState);

  useEffect(() => {
    if (loginUser) {
      setUser({
        id: loginUser!.id,
        nickname: loginUser!.nickname,
        like: loginUser!.like,
      });
    }
  }, [loginUser]);

  const auth = useRecoilValue<AuthState>(authState);
  console.log(auth);

  return (
    <ContentLayout pageTitle="Home">
      <Home />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
