import React from "react";

// NexJS
import Head from "next/head";
import dynamic from "next/dynamic";

// Components
const App = dynamic(() => import("../Components/App"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}
