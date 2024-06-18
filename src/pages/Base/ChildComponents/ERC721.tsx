import { TokenOptions } from "../Base";
import CodeViewer from "./CodeViewer";
import ERC721TokenOption from "./ERC721TokenOption";

type ERC721Props = {
    option: TokenOptions;
    setOption: Function;
    code: String;
}
const ERC721: React.FC<ERC721Props> = (props) => {
    const { option, setOption, code } = props;
    return (
        <>
            <div className="bg-white">
                <ERC721TokenOption option={option} setOption={setOption}></ERC721TokenOption>
            </div>
            <div className="flex-1">
                <CodeViewer code={code}></CodeViewer>
            </div>
        </>

    )
}
export default ERC721;