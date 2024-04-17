import axios from 'axios';
import { useEffect, useState } from "react";
import TokenOption from "./TokenOption";
import CodeViewer from "./CodeViewer";

type TokenOption = {
    name: string;
    symbol: string;
    premint: number;
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
    permit: boolean;
    flashMinting: boolean;
}

const Base = () => {
    const [code, setCode] = useState('');

    const getCode = async (option: TokenOption) => {
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
                    mintable: option.mintable,
                    burnable: option.burnable,
                    pausable: option.pausable,
                    permit: option.permit,
                    flashMinting: option.flashMinting
                }
            })
            console.log(res.data);
            setCode(res.data.contract);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const option: TokenOption = {
            name: 'TestToken',
            symbol: 'TT',
            premint: 1000000,
            mintable: true,
            burnable: true,
            pausable: true,
            permit: true,
            flashMinting: true
        }
        getCode(option);
    }, []);
    return (
        <div className="h-full bg-lime-500">
            <div className="flex flex-col h-full">
                <div className="block bg-red-100">abc</div>
                <div className="flex-1 flex flex-column bg-stone-500">
                    <div className="bg-red-500">
                        <TokenOption></TokenOption>
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