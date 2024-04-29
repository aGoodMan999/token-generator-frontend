import { useContext, useEffect, useState } from "react";
import DeploymentCard from "./ChildComponents/DeploymentCard";
import axios, { AxiosResponse } from "axios";
import { AccountContext } from "../../context/AccountContext";

type AccountDeploymentProps = {

}
const AccountDeployment: React.FC<AccountDeploymentProps> = () => {
    const [accountDeployment, setAccountDeployment] = useState<Deployment>();
    const { account } = useContext(AccountContext);

    useEffect(() => {
        getAccountDeploymentList();
    }, [account]);

    const getAccountDeploymentList = async () => {
        try {
            const url: string = `http://localhost:3002/deployment/${account}`
            const res: AxiosResponse = await axios.get(url);
            console.log("RES.DATA", res.data);
            setAccountDeployment(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Account Deployment List</h1>
            <div className="flex justify-center gap-2">
                <label htmlFor="searchDeployment">Search</label>
                <input type="text" className="border border-blue-500"></input>
            </div>

            <div className={`mt-2 grid gap-2 grid-cols-4`}>
                {accountDeployment && accountDeployment.deployment?.map((d, idx) =>
                    <DeploymentCard chainId={d.network?.chainId ?? null} networkName={d.network?.name ?? null} name={d.name ?? ''} address={d.address ?? ''} hashs={d.deployHash ?? ''} blockNumber={d.blockNumber ?? 0} />
                )}
            </div>
        </div>
    )
}

export default AccountDeployment;