import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Session } from "@supabase/gotrue-js";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import { Layout } from "@/components/layouts";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
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
