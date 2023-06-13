import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import type { AppProps } from "next/app";

import { Layout } from "@/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Gamble Payments</title>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
