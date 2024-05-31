import axios from "axios";
import { PopupModal } from "./ChildComponents/PopupModal";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import Vote_Dev from "../../enums/Vote_Dev";
import AccessControl_Dev from "../../enums/AccessControl_Dev";
import ERC20 from "./ChildComponents/ERC20";
import ERC721 from "./ChildComponents/ERC721";
import { Toaster, toast } from "sonner";

export type TokenOptions = {
  name: string;
  symbol: string;
  premint?: number;
  license: string;
  baseuri?: string;
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
};
const INIT_OPTION: TokenOptions = {
  name: "",
  symbol: "",
  premint: 0,
  license: "MIT",
  votes: Vote_Dev.NONE,
  accesscontrol: AccessControl_Dev.NONE,
  ismintable: false,
  isburnable: false,
  ispausable: false,
  ispermit: false,
  isflashmintable: false,
  isenumerable: false,
  isuristorage: false,
  isautoincrementids: false,
};
enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
}

const Base = () => {
  const { deployToken } = useContext(AccountContext);
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.ERC20);
  const [option, setOption] = useState<TokenOptions>(INIT_OPTION);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeloySuccess, setIsDeloySucess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCode(option);
  }, [option]);

  const getCode = async (option: TokenOptions) => {
    try {
      const url = `http://localhost:3002/code/${tokenType}`;
      const res = await axios.get(url, {
        //Set the Access-Control-Allow-Origin header on the server to allow the client to make cross-origin requests
        headers: {
          "Access-Control-Allow-Origin": "*",
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
          accesscontrol: option.accesscontrol,
        },
      });
      console.log(res.data);
      setCode(res.data.contract);
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";

    document.body.appendChild(textArea);

    textArea.select();

    try {
      document.execCommand("copy");
      toast.info("Code copied to clipboard!");
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Failed to copy code to clipboard!");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      if (option.name.length === 0) {
        toast.error("Please fill the name field");
        return;
      }
      if (option.name.includes(" ")) {
        toast.error("Name should not contain space");
        return;
      }
      await deployToken(option, tokenType);
      setIsDeloySucess(true);
      setShowModal(true);
    } catch (e) {
      console.log(e);
      setIsDeloySucess(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenInRemix = async () => {
    try {
      // Prepare the code to share with Remix
      const codeToShare = code;

      // Encode the code in base64
      const base64Code = btoa(codeToShare);

      // Construct the Remix URL with the base64 encoded code
      const remixURL = `https://remix.ethereum.org/#version=soljson-v0.8.12&optimize=false&runs=200&code=${base64Code}`;

      // Open Remix with the encoded URL
      // console.log("Opening Remix URL:", remixURL);
      window.open(remixURL, "_blank");
    } catch (error) {
      console.error("Error while trying to open in Remix:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${option.name}.sol`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // const handleDeploy = () => {
  //   if (option.name.length === 0) {
  //     alert('Please fill the name field');
  //     return;
  //   }
  //   if (option.name.includes(' ')) {
  //     alert('Name should not contain space');
  //     return;
  //   }
  //   deployToken(option, tokenType);
  // }
  return (
    <>
      {showModal && (
        <PopupModal
          type={isDeloySuccess ? "success" : "failed"}
          onClose={() => setShowModal(false)}
        />
      )}
      <Toaster richColors duration={3000} />
      <div className="h-full bg-lime-500">
        <div className="flex flex-col h-full">
          <div className="block bg-red-100">
            <div className="flex gap-2 w-full p-3 bg-green-500">
              <div className="flex gap-1">
                <button
                  className={`${
                    tokenType === TokenType.ERC20 ? "bg-blue-700" : "bg-white"
                  } rounded border p-2 text-sm border-black`}
                  disabled={tokenType === TokenType.ERC20}
                  onClick={() => setTokenType(TokenType.ERC20)}
                >
                  ERC20
                </button>
                <button
                  className={`${
                    tokenType === TokenType.ERC721 ? "bg-blue-700" : "bg-white"
                  } rounded border p-2 text-sm border-black`}
                  disabled={tokenType === TokenType.ERC721}
                  onClick={() => setTokenType(TokenType.ERC721)}
                >
                  ERC721
                </button>
              </div>
              <div className="flex-1"></div>
              <div className="flex justify-end gap-2 w-full p-3 bg-green-500">
                <button
                  className="bg-white rounded border p-2 text-sm border-black"
                  onClick={handleDownload}
                >
                  Download
                </button>
                <button
                  className="bg-white rounded border p-2 text-sm border-black"
                  onClick={handleOpenInRemix}
                >
                  Open in Remix
                </button>
                <button
                  className="bg-white rounded border p-2 text-sm border-black"
                  onClick={handleCopyToClipboard}
                >
                  Copy to Clipboard
                </button>
                {/* <button
                className="bg-white rounded border p-2 text-sm border-black"
                onClick={handleDeploy}
              >
                Deploy!!
              </button> */}
                <button
                  type="button"
                  className="flex items-center bg-white rounded border p-2 text-sm border-black"
                  onClick={handleDeploy}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <svg
                      className="mr-3 h-5 w-5 animate-spin text-green"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  <span className="font-medium">
                    {" "}
                    {isLoading ? "Deloying..." : "Deloy!"}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-column bg-stone-500">
            {tokenType === TokenType.ERC20 ? (
              <ERC20 option={option} setOption={setOption} code={code}></ERC20>
            ) : (
              <ERC721
                option={option}
                setOption={setOption}
                code={code}
              ></ERC721>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
