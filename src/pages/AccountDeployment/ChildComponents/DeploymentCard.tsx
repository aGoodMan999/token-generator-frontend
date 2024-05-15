// import { useContext } from "react";
// import { AccountContext } from "../../../context/AccountContext"
// import { shortenAddress } from "../../../untils/functions/ShortenAddress";
// type DeploymentCardProps = {
//     name: string;
//     address: string;
//     hashs: string;
//     blockNumber: number;
//     chainId: number | null;
//     networkName: string | null;
// }
// const DeploymentCard: React.FC<DeploymentCardProps> = (props) => {
//     const { account } = useContext(AccountContext);
//     return (
//         <div className="flex">
//             <div className="border rounded border-black">
//                 <div className="text-2xl">{props.name}</div>
//                 <div>Address: {shortenAddress(props.address)}</div>
//                 <div>Owner: {shortenAddress(account ?? '')}</div>
//                 <div>Block Number: {`${props.blockNumber}`}</div>
//                 <div>Deploy hash: {shortenAddress(props.hashs)}</div>
//                 <div>Chain ID: {props.chainId}</div>
//                 <div>Deploy hash: {props.networkName}</div>

//             </div>
//         </div>
//     )
// }

// export default DeploymentCard;

import { useContext } from "react";
import { AccountContext } from "../../../context/AccountContext";
import { shortenAddress } from "../../../untils/functions/ShortenAddress";

type DeploymentCardProps = {
  name: string;
  address: string;
  hashs: string;
  blockNumber: number;
  chainId: number | null;
  networkName: string | null;
};

const DeploymentCard: React.FC<DeploymentCardProps> = (props) => {
  const { account } = useContext(AccountContext);

  return (
    <div className="flex justify-center">
      <div className="max-w-md rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.name}</div>
          <div className="mb-2">Address: {shortenAddress(props.address)}</div>
          <div className="mb-2">Owner: {shortenAddress(account ?? "")}</div>
          <div className="mb-2">Block Number: {props.blockNumber}</div>
          <div className="mb-2">Deploy hash: {shortenAddress(props.hashs)}</div>
          <div className="mb-2">Chain ID: {props.chainId}</div>
          <div className="mb-2">Network Name: {props.networkName}</div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentCard;
