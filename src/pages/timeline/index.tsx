import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { Timeline } from "@/features/timeline";
import { useUser } from "@/hooks/use-user";
import { AuthState, authState } from "@/stores/auth";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function TimelinePage({ user }: Props) {
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
    <ContentLayout pageTitle="Timeline">
      <Timeline />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
