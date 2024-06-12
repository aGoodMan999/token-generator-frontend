import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
// import 'prismjs/themes/prism-twilight.css';
import "prismjs/components/prism-solidity";

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

  return (
    <div className="h-full">
      <h1>CodeViewer</h1>
      <div className="p-2">
        <pre className="h-full border border-white">
          <code ref={codeRef} className="language-solidity">
            {props.code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
