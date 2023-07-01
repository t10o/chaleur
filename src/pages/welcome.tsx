import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

import { ContentLayout } from "@/components/layouts";
import { Welcome } from "@/features/welcome";
import { Database } from "@/types/schema";

export default function WelcomePage() {
  return (
    <ContentLayout pageTitle="Welcome!">
      <Welcome />
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

  const { data: userData } = await supabase
    .from("general_users")
    .select("*")
    .eq("user_id", session.user.id);

  console.log(userData && !!userData.length);

  if (userData && !!userData.length) {
    return {
      redirect: {
        destination: "/",
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
