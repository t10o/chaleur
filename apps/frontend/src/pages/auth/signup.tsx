import { NextPage } from "next";

import { ContentLayout } from "@/components/layouts";
import { Signup } from "@/features/auth";

const SignupPage: NextPage = () => {
  return (
    <ContentLayout pageTitle="Sign Up">
      <Signup />
    </ContentLayout>
  );
};

export default SignupPage;
