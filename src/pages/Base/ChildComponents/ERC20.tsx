import { TokenOptions } from "../Base";
import ERC20TokenOption from "./ERC20TokenOption"
import CodeViewer from "./CodeViewer";

type ERC20Props = {
    option: TokenOptions;
    setOption: Function;
    code: string;
}
const ERC20: React.FC<ERC20Props> = (props) => {
    const { option, setOption, code } = props;
    return (
        <>
            <div className="bg-red-500">
                <ERC20TokenOption option={option} setOption={setOption}></ERC20TokenOption>
            </div>
            <div className="flex-1">
                <CodeViewer code={code}></CodeViewer>
            </div>
        </>

    )
}
export default ERC20;