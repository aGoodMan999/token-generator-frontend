import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { AccountContext } from "./AccountContext";
import abi from '../untils/DeployedTokenManagement.json';
import { TokenOptions } from "../components/Base";
import axios from "axios";



const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

interface AccountContextProviderProps {
    children: React.ReactNode;
}
declare global {
    interface Window {
        ethereum: any
    }
}
const AccountContextProvider: React.FC<AccountContextProviderProps> = (props) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<JsonRpcProvider>()
    const [signer, setSigner] = useState<JsonRpcSigner>();
    const [contract, setContract] = useState<Contract>(new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer));

    useEffect(() => {
        setContract(new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer));
        console.log('Contract: ', contract);
    }, [signer]);

    useEffect(() => {
        updateEthers();
    }, [])

    useEffect(() => {
        if (window.ethereum) {
            //account change event
            window.ethereum.on('accountsChanged', (accounts: any) => {
                if (accounts.length === 0) { // User has lock the metamask
                    console.log('User has lock the metamask');
                    updateEthers();

                } else {
                    console.log('Account Changed: ', accounts[0]);
                    updateEthers();
                }
            })
            // chain change event
            window.ethereum.on('chainChanged', (chainId: any) => {
                updateEthers();
            });

        }
    }, [])


    // ADD EVENT
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('You need to install MetaMask first!');
            return;
        }
        if (account) {
            alert('You have already connected to the wallet!')
            return
        }
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
    }

    const accountChangeHandler = (accounts: string) => {
        setAccount(accounts);
        updateEthers();
    }

    const addToken = async (tokenAddress: String) => {
        // const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
        console.log("signer", signer);
        try {
            await contract.addToken(tokenAddress);
        } catch (error) {
            console.log(error);
            alert("User has reject the transaction")
        }
    }

    const getTokenList = async (owner: String) => {
        // const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
        let res: number = -1;
        try {
            res = await contract.getTokenList(owner);
        } catch (error) {
            console.log(error);
        }
        return res as number;
    }

    const updateEthers = async () => {
        if (window.ethereum) {
            try {
                setProvider(undefined);
                setSigner(undefined);
                setAccount(null);
                let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(tempProvider)
                let signer = tempProvider.getSigner();
                setSigner(signer);
                console.log('Signer: ', signer);
                let address = await signer.getAddress();
                setAccount(address);

                console.log('Account: ', address);

            } catch (error) {
                console.log(error);
            }
        }
    }

    const getCompiledCode = async (option: TokenOptions) => {
        try {
            const url = 'http://localhost:3002/code/get-compiled-code';
            const res = await axios.get(url, {
                params: {
                    name: option.name,
                    symbol: option.symbol,
                    premint: option.premint,
                    license: option.license,
                    ismintable: option.ismintable ? 1 : 0,
                    isburnable: option.isburnable ? 1 : 0,
                    ispausable: option.ispausable ? 1 : 0,
                    ispermit: option.ispermit ? 1 : 0,
                    isflashmintable: option.isflashmintable ? 1 : 0
                }
            })
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const deployToken = async (tokenOptions: TokenOptions) => {
        if (!account) {
            alert('Please connect to the wallet first!');
            return;
        }
        const compiledCode = await getCompiledCode(tokenOptions);
        const abi = compiledCode.abi;
        const bytecode = compiledCode.bytecode;
        if (!signer) {
            return;
        }
        console.log('Deploying contract with the account:', await signer.getAddress());

        // Compile the contract
        const factory = new ethers.ContractFactory(abi, bytecode, signer);

        // Deploy the contract
        const contract = await factory.deploy();

        // Wait for the contract to be mined
        await contract.deployed();

        console.log('Contract deployed at address:', contract.address);
    }

    return (
        <AccountContext.Provider value={{
            account: account,
            connectWallet: connectWallet,
            updateEthers: updateEthers,
            accountChangeHandler: accountChangeHandler,
            addToken: addToken,
            getTokenList: getTokenList,
            deployToken: deployToken,
            provider: provider,
            signer: signer,
            contract: contract
        }}>
            {props.children}
        </AccountContext.Provider>
    )

}

export default AccountContextProvider;