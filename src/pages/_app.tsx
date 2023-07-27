import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "nprogress/nprogress.css";

import { Session } from "@supabase/gotrue-js";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import { Layout } from "@/components/layouts";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <RecoilRoot>
        <title>chaleur</title>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>

      <Analytics />
    </>
  );
}
