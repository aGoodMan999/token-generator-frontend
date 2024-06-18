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
    let stringElement = document.getElementsByClassName("string");
    for (let i = 0; i < stringElement.length; i++) {
      console.log(stringElement[i]);
      if (stringElement[i].innerHTML?.startsWith("\"@openzeppelin")) {
        const achor: HTMLAnchorElement = document.createElement("a");
        const version = "v5.0.2"
        const subLink = `https://github.com/OpenZeppelin/openzeppelin-contracts/blob/${version}`;
        const cleanText = stringElement[i].textContent?.replace(/^"|"$/g, ''); // Remove leading and trailing quotes
        const link = cleanText?.replace("@openzeppelin", subLink) ?? "";
        achor.href = link;
        achor.textContent = stringElement[i].textContent;
        achor.target = "_blank"; // Open in new tab
        stringElement[i].textContent = '';
        stringElement[i].appendChild(achor);
      }
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
