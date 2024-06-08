import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/images/favicon.svg" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="portal"></div>
      </body>
    </Html>
  );
}
