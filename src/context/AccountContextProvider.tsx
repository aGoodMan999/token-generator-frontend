import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { AccountContext } from "./AccountContext";

interface AccountContextProviderProps {
    children: React.ReactNode;
}
declare global {
    interface Window {
        ethereum: any
    }
}
const AccountContextProvider: React.FC<AccountContextProviderProps> = (props) => {
    const [account, setAccount] = useState<String>();
    const [provider, setProvider] = useState<JsonRpcProvider>()
    const [signer, setSigner] = useState<JsonRpcSigner>();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: any) => {
                if (accounts)
                    console.log('Account Changed: ', accounts[0]);
            })
            window.ethereum.on('chainChanged', (chainId: any) => {
                updateEthers();
            });
        }
    }, [])
    // ADD EVENT
    const connectWallet = async () => {

        if (window.ethereum) {
            try {
                if (window.ethereum.request) {
                    const res = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    if (res) {
                        setAccount(res[0]);
                        updateEthers();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('You need to install MetaMask first!');
        }
    }

    const accountChangeHandler = (accounts: String) => {
        setAccount(accounts);
        updateEthers();
    }
    const updateEthers = async () => {
        if (window.ethereum) {
            let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(tempProvider);

            let signer = tempProvider.getSigner();
            setSigner(signer);

            let address = await signer.getAddress();
            setAccount(address);

            console.log('Account: ', address);
        }
    }
    return (
        <AccountContext.Provider value={{
            account: account,
            connectWallet: connectWallet,
            updateEthers: updateEthers,
            accountChangeHandler: accountChangeHandler,
            provider: provider,
            signer: signer
        }}>
            {props.children}
        </AccountContext.Provider>
    )

}

export default AccountContextProvider;