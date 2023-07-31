import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ja">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="chaleur" />
        <link
          href="/splash/launch-320x568.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-375x667.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-375x812.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-390x844.png"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-393x852.png"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-414x736.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-428x926.png"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-430x932.png"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-744x1133.png"
          media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-834x1194.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-1024x1366.png"
          media="(device-width: 1024px) and (device-height: 1336px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-1280x832.png"
          media="(device-width: 1280px) and (device-height: 832px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-1512x982.png"
          media="(device-width: 1512px) and (device-height: 982px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/launch-1728x1117.png"
          media="(device-width: 1728px) and (device-height: 1117px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
