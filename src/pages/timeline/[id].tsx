import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { TimelineDetail } from "@/features/timeline/components/TimelineDetail";
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
    <ContentLayout pageTitle={<Link href="/timeline">Timeline</Link>}>
      <TimelineDetail />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
