import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

import { ContentLayout } from "@/components/layouts";
import { Home } from "@/features/home";
import { Database } from "@/types/schema";

export default function HomePage() {
  return (
    <ContentLayout pageTitle="MyPage">
      <Home />
    </ContentLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const { data } = await supabase.from("users").select("*");

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};
