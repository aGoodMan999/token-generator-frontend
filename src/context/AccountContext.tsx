import { Contract } from "ethers";
import { createContext } from "react";
import { JsonRpcSigner, JsonRpcProvider } from "@ethersproject/providers";

export interface AccountContextType {
    account: string | null;
    connectWallet: Function;
    updateEthers: Function;
    accountChangeHandler: Function;
    addToken: Function;
    getTokenList: Function;
    deployToken: Function;
    saveDeployment: Function;
    provider?: JsonRpcProvider;
    signer?: JsonRpcSigner;
    contract: any;
}
const INIT_VALUE: AccountContextType = {
    account: null,
    connectWallet: () => { },
    updateEthers: () => { },
    accountChangeHandler: () => { },
    addToken: () => { },
    getTokenList: () => { },
    deployToken: () => { },
    saveDeployment: () => { },
    contract: null
}
export const AccountContext = createContext(
    INIT_VALUE
);