import { DataProvider } from "components/DataProvider/DataProvider";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo } from "react";
import { Timeline } from "../components/Timeline/Timeline";

const Home: NextPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Head>
        <title>Lierno Map</title>
        <meta name="description" content="Lierno's world map with timeline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DataProvider>
        <Map />
        <Timeline />
      </DataProvider>
    </>
  );
};

export default Home;
