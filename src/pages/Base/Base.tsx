import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AccountContext } from '../../context/AccountContext';
import Vote_Dev from '../../enums/Vote_Dev';
import AccessControl_Dev from '../../enums/AccessControl_Dev';
import ERC20 from './ChildComponents/ERC20';
import ERC721 from './ChildComponents/ERC721';

export type TokenOptions = {
    name: string;
    symbol: string;
    premint?: number;
    license: string;
    baseuri?: string
    votes: Vote_Dev;
    accesscontrol: AccessControl_Dev;
    ismintable: boolean;
    isburnable: boolean;
    ispausable: boolean;
    ispermit?: boolean;
    isflashmintable?: boolean;
    isenumerable?: boolean;
    isuristorage?: boolean;
    isautoincrementids?: boolean;
}
const INIT_OPTION: TokenOptions = {
    name: '',
    symbol: '',
    premint: 0,
    license: 'MIT',
    votes: Vote_Dev.NONE,
    accesscontrol: AccessControl_Dev.NONE,
    ismintable: false,
    isburnable: false,
    ispausable: false,
    ispermit: false,
    isflashmintable: false,
    isenumerable: false,
    isuristorage: false,
    isautoincrementids: false
}
enum TokenType { ERC20 = 'ERC20', ERC721 = 'ERC721' };

const Base = () => {
    const { deployToken } = useContext(AccountContext);
    const [tokenType, setTokenType] = useState<TokenType>(TokenType.ERC20);
    const [option, setOption] = useState<TokenOptions>(INIT_OPTION);
    const [code, setCode] = useState('');

    useEffect(() => {
        getCode(option);
    }, [option]);


    const getCode = async (option: TokenOptions) => {
        try {
            const url = `http://localhost:3002/code/${tokenType}`
            const res = await axios.get(url, {
                //Set the Access-Control-Allow-Origin header on the server to allow the client to make cross-origin requests
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    tokentype: tokenType,
                    name: option.name,
                    symbol: option.symbol,
                    premint: option.premint,
                    license: option.license,
                    baseuri: option.baseuri,
                    ismintable: option.ismintable ? 1 : 0,
                    isburnable: option.isburnable ? 1 : 0,
                    ispausable: option.ispausable ? 1 : 0,
                    ispermit: option.ispermit ? 1 : 0,
                    isflashmintable: option.isflashmintable ? 1 : 0,
                    isenumerable: option.isenumerable ? 1 : 0,
                    isuristorage: option.isuristorage ? 1 : 0,
                    isautoincrementids: option.isautoincrementids ? 1 : 0,
                    votes: option.votes,
                    accesscontrol: option.accesscontrol
                }
            })
            console.log(res.data);
            setCode(res.data.contract);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     const option: TokenOption = {
    //         name: 'TestToken',
    //         symbol: 'TT',
    //         premint: 1000000,
    //         mintable: true,
    //         burnable: true,
    //         pausable: true,
    //         permit: true,
    //         flashMinting: true
    //     }
    //     getCode(option);
    // }, []);

    const handleDeploy = () => {
        if (option.name.length === 0) {
            alert('Please fill the name field');
            return;
        }
        if (option.name.includes(' ')) {
            alert('Name should not contain space');
            return;
        }
        deployToken(option, tokenType);
    }
    return (
        <div className="h-full bg-lime-500">
            <div className="flex flex-col h-full">
                <div className="block bg-red-100">
                    <div className='flex gap-2 w-full p-3 bg-green-500'>
                        <div className='flex gap-1'>
                            <button className={`${tokenType === TokenType.ERC20 ? "bg-blue-700" : "bg-white"} rounded border p-2 text-sm border-black`} disabled={tokenType === TokenType.ERC20} onClick={() => setTokenType(TokenType.ERC20)}>ERC20</button>
                            <button className={`${tokenType === TokenType.ERC721 ? "bg-blue-700" : "bg-white"} rounded border p-2 text-sm border-black`} disabled={tokenType === TokenType.ERC721} onClick={() => setTokenType(TokenType.ERC721)}>ERC721</button>
                        </div>
                        <div className='flex-1'></div>
                        <div>
                            <button className='bg-white rounded border p-2 text-sm border-black'>
                                Download
                            </button>
                            <button className='bg-white rounded border p-2 text-sm border-black'>Open in Remix</button>
                            <button className='bg-white rounded border p-2 text-sm border-black'>Copy to Clipboard</button>
                            <button className='bg-white rounded border p-2 text-sm border-black' onClick={handleDeploy}>Deploy!!</button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-column bg-stone-500">
                    {tokenType === TokenType.ERC20 ?
                        <ERC20 option={option} setOption={setOption} code={code}></ERC20>
                        :
                        <ERC721 option={option} setOption={setOption} code={code}></ERC721>}
                </div>
            </div>
        </div>
    )
}

export default Base;