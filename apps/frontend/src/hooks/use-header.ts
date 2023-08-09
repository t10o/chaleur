import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const noAuthorizeRequired = ["/auth/signin", "/auth/signup"];

  const [isAuthorizeRequired, setIsAuthorizeRequired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthorizeRequired(noAuthorizeRequired.includes(router.pathname));
  }, [router.pathname]);

  return {
    isAuthorizeRequired,
  };
};
