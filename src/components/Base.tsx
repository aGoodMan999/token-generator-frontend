import TokenOption from "./TokenOption";
import CodeViewer from "./CodeViewer";
const Base = () => {




    return (
        <div className="h-full bg-lime-500">
            <div className="flex flex-col h-full">
                <div className="block bg-red-100">abc</div>
                <div className="flex-1 flex flex-column bg-stone-500">
                    <div className="bg-red-500">
                        <TokenOption></TokenOption>
                    </div>
                    <div className="flex-1">
                        <CodeViewer></CodeViewer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Base;