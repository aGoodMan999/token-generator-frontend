import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import TokenOption from "./ChildComponents/TokenOption";
import CodeViewer from "./ChildComponents/CodeViewer";
import { AccountContext } from '../../context/AccountContext';

export type TokenOptions = {
    name: string;
    symbol: string;
    premint: number;
    license: string;
    ismintable: boolean;
    isburnable: boolean;
    ispausable: boolean;
    ispermit: boolean;
    isflashmintable: boolean;
}
const INIT_OPTION: TokenOptions = {
    name: '',
    symbol: '',
    premint: 0,
    license: 'MIT',
    ismintable: false,
    isburnable: false,
    ispausable: false,
    ispermit: false,
    isflashmintable: false
}
const Base = () => {
    const [code, setCode] = useState('');
    const [option, setOption] = useState<TokenOptions>(INIT_OPTION);
    const { deployToken } = useContext(AccountContext);

    const handleDeploy = () => {
        if (option.name.length === 0) {
            alert('Please fill the name field');
            return;
        }
        if (option.name.includes(' ')) {
            alert('Name should not contain space');
            return;
        }
        deployToken(option);
    }
    const getCode = async (option: TokenOptions) => {
        try {
            const url = 'http://localhost:3002/code'
            const res = await axios.get(url, {
                //Set the Access-Control-Allow-Origin header on the server to allow the client to make cross-origin requests
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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

    useEffect(() => {
        getCode(option);
    }, [option]);
    return (
        <div className="h-full bg-lime-500">
            <div className="flex flex-col h-full">
                <div className="block bg-red-100">
                    <div className='flex justify-end gap-2 w-full p-3 bg-green-500'>
                        <button className='bg-white rounded border p-2 text-sm border-black'>
                            Download
                        </button>
                        <button className='bg-white rounded border p-2 text-sm border-black'>Open in Remix</button>
                        <button className='bg-white rounded border p-2 text-sm border-black'>Copy to Clipboard</button>
                        <button className='bg-white rounded border p-2 text-sm border-black' onClick={handleDeploy}>Deploy!!</button>
                    </div>
                </div>
                <div className="flex-1 flex flex-column bg-stone-500">
                    <div className="bg-red-500">
                        <TokenOption option={option} setOption={setOption}></TokenOption>
                    </div>
                    <div className="flex-1">
                        <CodeViewer code={code}></CodeViewer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Base;