import { createContext } from "react";

export interface AccountContextType {
    account: String | null;
    connectWallet: () => void;
    updateEthers: () => void;
    accountChangeHandler: (account: String) => void;
    provider?: any;
    signer?: any;
}
const INIT_VALUE: AccountContextType = {
    account: null,
    connectWallet: () => { },
    updateEthers: () => { },
    accountChangeHandler: () => { }
}
export const AccountContext = createContext({});