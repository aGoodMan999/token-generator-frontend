import { useContext } from "react";
import { AccountContext } from "../../../context/AccountContext"
import { shortenAddress } from "../../../untils/functions/ShortenAddress";
type DeploymentCardProps = {
    name: string;
    address: string;
    hashs: string;
    blockNumber: number;
    chainId: number;
    networkName: string;
    timeStamp: number;
}
const DeploymentCard: React.FC<DeploymentCardProps> = (props) => {
    const { account } = useContext(AccountContext);
    const date = new Date(props.timeStamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return (
        <div className="flex">
            <div className="border rounded border-black">
                <div className="text-2xl">{props.name}</div>
                <div>Address: {shortenAddress(props.address)}</div>
                <div>Owner: {shortenAddress(account ?? '')}</div>
                <div>Block Number: {`${props.blockNumber}`}</div>
                <div>Deploy hash: {shortenAddress(props.hashs)}</div>
                <div>Chain ID: {props.chainId}</div>
                <div>Deploy hash: {props.networkName}</div>
                <div>Time stampt: {props.timeStamp}</div>
                <div>Created: {`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`}</div>
            </div>
        </div>
    )
}

export default DeploymentCard;