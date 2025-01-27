import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>SolGats</title>
        <meta
          name="description"
          content="asd"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
