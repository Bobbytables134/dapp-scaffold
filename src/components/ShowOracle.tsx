// TODO: SignMessage
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { sign } from 'tweetnacl';
import { notify } from "../utils/notifications";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ShowOracle: FC = () => {
    const { publicKey, signMessage } = useWallet();

    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            // Encode anything as bytes
            const message = new TextEncoder().encode('Hello, world!');
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
            notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, notify, signMessage]);

  // ------------------------------------------------ 
  // ------------ START SHOW PEW BALANCE TEST
  // ------------------------------------------------ 
  const web3 = require("@solana/web3.js");
(async () => {
  const solana = new web3.Connection("https://dawn-black-haze.solana-mainnet.quiknode.pro/2b865c1f0dda4e7e69f261035a6f2bffef825b22/");
  const accBalance = await solana.getTokenAccountBalance(
    new web3.PublicKey("BbsB8JVa6gKrD1GfoRKkLzFxq2eC52gdAgG8GrWbg748")
  );
  
  console.log("Total $PEW supply is " + accBalance.value.uiAmountString);
  console.log("Your $PEW balance is ");

})();

  // ------------------------------------------------ 
  // ------------ END SHOW PEW BALANCE TEST
  // ------------------------------------------------ 
  
    return (
        
        <div className="outer-center">
            <button
                className="group m-2  disabled:animate-none  "
                onClick={onClick} disabled={!publicKey}
            >

                
                <div className="hidden group-disabled:block">
                <h1 id="oracle-headline" className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                Ask The Oracle
                </h1>

                <h4 className="md:w-full text-center text-slate-300 my-2">
                <p id="oracle-subtext">Peer into the future of SolGats' journey<br></br>
                with the all seeing eye of The Oracle.</p>
                
                </h4>
                    <div className='hp-img-box'>  
                        <img className="hp-img-box" src="../../oracle.png">
                        </img>

                    </div>
                    <WalletMultiButton className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..." />

                </div>
                <span className="block group-disabled:hidden" > 
                <div className="oracle-cover">
                <h1 id="oracle-headline2" className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                Ask The Oracle
                </h1>
            
                </div>

                   
                    <div className="oracle-container">
                        <iframe
                            allow="microphone;"
                            width="350"
                            height="430"
                            className="yek"
                            src="https://console.dialogflow.com/api-client/demo/embedded/d752ef47-0abc-41a9-bf98-3824719dbdc6">
                        </iframe> 
                    </div>

                </span>
            </button>
        </div>
    );
};
