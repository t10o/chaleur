import { NextPage } from "next";

import { ContentLayout } from "@/components/layouts";
import { Signup } from "@/feature/auth";

export const SignupPage: NextPage = () => {
  return (
    <ContentLayout pageTitle="Sign Up">
      <Signup />
    </ContentLayout>
  );
};

export default SignupPage;
