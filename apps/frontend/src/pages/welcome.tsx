import { User } from "@supabase/auth-helpers-nextjs";

import { ContentLayout } from "@/components/layouts";
import { Welcome } from "@/features/welcome";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function WelcomePage({ user }: Props) {
  return (
    <ContentLayout pageTitle="Welcome!">
      <Welcome user={user} />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
