import { Contract } from "ethers";
import { createContext } from "react";
import { JsonRpcSigner, JsonRpcProvider } from "@ethersproject/providers";
import { TokenOptions } from "../components/Base";
export interface AccountContextType {
    account: string | null;
    connectWallet: () => void;
    updateEthers: () => void;
    accountChangeHandler: (account: string) => void;
    addToken: (tokenAddress: string) => void;
    getTokenList: (owner: string) => number;
    deployToken: (tokenOptions: TokenOptions) => Contract;
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
    getTokenList: () => { return -1 },
    deployToken: () => { return new Contract("", "") },
    contract: null
}
export const AccountContext = createContext(
    INIT_VALUE
);