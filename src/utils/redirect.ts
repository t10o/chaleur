import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { Database } from "@/types/schema";

export const redirect: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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

  if (ctx.resolvedUrl === "/welcome") {
    const { data: userData } = await supabase
      .from("general_users")
      .select("*")
      .eq("user_id", session.user.id);

    if (userData && !!userData.length) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
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
