import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>SolGats - Ask The Oracle</title>
        <meta
          name="SolGats - Ask The Oracle"
          content="Peer into the future of SolGats journey with the all seeing eye of The Oracle."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
