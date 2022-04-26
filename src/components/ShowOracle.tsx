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
  
    return (
        <div>
            <button
                className="group m-2  disabled:animate-none  "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block">
                    
                    <div className='hp-img-box'>
                        <img className="hp-img-box" src="../../oracle.png">
                        </img>

                    </div>
                    <WalletMultiButton className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..." />

                </div>
                <span className="block group-disabled:hidden" > 

                    <div className="oracle-cover">
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
