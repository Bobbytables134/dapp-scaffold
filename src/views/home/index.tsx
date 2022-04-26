// Next, React
import { FC, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import { ShowOracle } from '../../components/ShowOracle';

import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const web3 = require("@solana/web3.js");
  let [pewBalance, setPewBalance] = useState(0);

  const getPewBalance = async (MY_WALLET_ADDRESS) => {
    const connection = new web3.Connection("https://dawn-black-haze.solana-mainnet.quiknode.pro/2b865c1f0dda4e7e69f261035a6f2bffef825b22/");

    const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        {
          filters: [
            {
              dataSize: 165, // number of bytes
            },
            {
              memcmp: {
                offset: 32, // number of bytes
                bytes: MY_WALLET_ADDRESS, // base58 encoded string
              },
            },
          ],
        }
    );
    const pewToken =  accounts.filter(function(account) {
      return account.account.data["parsed"]["info"]["mint"] == "AvYRFjk4imoGSAYxcwfm4dM6qQigR6DZJt3vDatdgPeP";
    });
    pewToken.forEach((account, i) => {
      let pewAmount = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]
      setPewBalance(pewAmount);
    });
  };

  useEffect(() => {
    if (wallet.publicKey) {
      let MY_WALLET_ADDRESS = wallet.publicKey.toBase58();
      getPewBalance(MY_WALLET_ADDRESS);
    }
  }, [wallet.publicKey, connection])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1>You have {pewBalance} $PEW</h1><br/>
        <h1 id="oracle-headline" className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Ask The Oracle 
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p id="oracle-subtext">Peer into the future of SolGats' journey<br></br>
          with the all seeing eye of The Oracle.</p>

        </h4>
            
        <div className="text-center oracle-move-cover">
          <ShowOracle />
        </div>
      </div>
    </div>
  );
};
