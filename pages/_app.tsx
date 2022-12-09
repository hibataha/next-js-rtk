import "../styles/globals.css";
// import type { AppProps } from "next/app";
// // const { default: AbortController } = require("abort-controller");
// // const { default: fetch, Headers, Request, Response } = require("node-fetch");

// // Object.assign(globalThis, {
// //   Headers,
// //   Request,
// //   Response,
// //   AbortController,
// // });
// const { default: AbortController } = require("abort-controller");

// import fetch, { Headers, Request, Response } from 'node-fetch';
// if (!('fetch' in globalThis)) {
//   Object.assign(globalThis, { fetch, Headers, Request, Response })
// }

// const { wrapper } = require("../src/store");

// export function App({ Component, pageProps }: AppProps) {
//   return (
//       <Component {...pageProps} />
//   );
// }

// export default wrapper.withRedux(App);


// const { default: AbortController } = require("abort-controller");
// const { default: fetch, Headers, Request, Response } = require("node-fetch");

// Object.assign(globalThis, {
//   fetch,
//   Headers,
//   Request,
//   Response,
//   AbortController,
// });

import { AppProps } from "next/app";
const { wrapper } = require("../src/store");

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
