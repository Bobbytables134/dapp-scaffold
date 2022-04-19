import type { NextPage } from "next";
import Head from "next/head";
import { OracleView } from "../views/oracle";
import { ShowOracle } from "../components/ShowOracle";

const Oracle: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>SolGats</title>
        <meta
          name="description"
          content="SolGats"
        />
      </Head>
     
      <ShowOracle />
    </div>
  );
};

export default Oracle;
