import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { Calendar } from "@/features/data/components/Calendar/Calendar";
import { useUser } from "@/hooks/use-user";
import { AuthState, authState } from "@/stores/auth";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function DataCalendarPage({ user }: Props) {
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

  return (
    <ContentLayout pageTitle="Calendar">
      <Calendar />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
