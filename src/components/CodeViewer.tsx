import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
// import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-solidity';

type CodeViewerProps = {
    code: String;
};

const CodeViewer: React.FC<CodeViewerProps> = (props) => {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [props.code]);

    const code = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.5.0;

    contract SimpleStorage {
        uint storedData;

        function set(uint x) public {
            storedData = x;
        }

        function get() public view returns (uint) {
            return storedData;
        }
    }
    `;

    return (
        <div className="h-full">
            <h1>CodeViewer</h1>
            <div className="p-2">
                <pre className="h-full">
                    <code ref={codeRef} className="language-solidity">
                        {props.code}
                    </code>
                </pre>
            </div>

        </div>
    )
}

export default CodeViewer;