import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { Graph } from "@/features/data/components/Graph/Graph";
import { useUser } from "@/hooks/use-user";
import { AuthState, authState } from "@/stores/auth";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function DataGraphPage({ user }: Props) {
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
      <Graph />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
