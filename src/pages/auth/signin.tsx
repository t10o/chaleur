import { NextPage } from "next";

import { ContentLayout } from "@/components/layouts";
import { Signin } from "@/features/auth";

export const SigninPage: NextPage = () => {
  return (
    <ContentLayout pageTitle="Sign In">
      <Signin />
    </ContentLayout>
  );
};

export default SigninPage;
