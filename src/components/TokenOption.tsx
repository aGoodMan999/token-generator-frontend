import React from "react";
const TokenOption: React.FC<{}> = () => {
    return (
        <div className="h-full p-2 gap-y-2 ps-4 flex flex-col bg-lime-100 devide-y divide-blue-200">
            {/* SETTING */}
            <div id="setting">
                <h1>Setting</h1>
                <div className="ms-2">
                    <div className="flex gap-x-4">
                        <div className="">
                            <h2>Name</h2>
                            <input type="text"></input>
                        </div>
                        <div className="">
                            <h2>Symbol</h2>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div>
                        <h2>Premint</h2>
                        <input type="text"></input>
                    </div>
                </div>
            </div>
            {/* FEATURES */}
            <div className="flex flex-col">
                <h1>Features</h1>
                <div className="ms-2">
                    <div>
                        <input id="mintable" type="checkbox"></input>
                        <label htmlFor="mintable">Mintable</label>
                    </div>   <div>
                        <input id="burnable" type="checkbox"></input>
                        <label htmlFor="burnable">Burnable</label>
                    </div>   <div>
                        <input id="pausable" type="checkbox"></input>
                        <label htmlFor="pausable">Pausable</label>
                    </div>   <div>
                        <input id="permit" type="checkbox"></input>
                        <label htmlFor="permit">Permit</label>
                    </div>   <div>
                        <input id="flashMinting" type="checkbox"></input>
                        <label htmlFor="flashMinting">Flash Minting</label>
                    </div>
                </div>
            </div>
            {/* VOTE */}
            <div className="flex flex-col">
                <div>
                    <label htmlFor="isVoted">Vote</label>
                    <input id="isVoted" type="checkbox" className="rounded-full"></input>
                </div>
                <div className="ms-2">
                    <div>
                        <input id="blockNumber" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="blockNumber">Block Number</label>
                    </div>
                    <div>
                        <input id="timeStampt" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="timeStampt">Timestamp</label>
                    </div>
                </div>
            </div>
            {/* ACCESS CONTROL */}
            <div className="flex flex-col">
                <div>
                    <label htmlFor="accesscontrol">Access control</label>
                    <input id="accesscontrol" type="checkbox" className="rounded-full"></input>
                </div>
                <div className="ms-2">
                    <div>
                        <input id="blocknumber" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="blocknumber">Ownable</label>
                    </div>
                    <div>
                        <input id="roles" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="roles">Roles</label>
                    </div>
                    <div>
                        <input id="managed" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="managed">Managed</label>
                    </div>
                </div>
            </div>
            {/* UPGRADEABILITY */}
            <div className="flex flex-col">
                <div>
                    <label htmlFor="upgradeability">Upgradeability</label>
                    <input id="upgradeability" type="checkbox" className="rounded-full"></input>
                </div>
                <div className="ms-2">
                    <div>
                        <input id="transparent" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="transparent">Transparent</label>
                    </div>
                    <div>
                        <input id="uups" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="uups">UUPS</label>
                    </div>
                    <div>
                        <input id="managed" type="checkbox" className="rounded-full"></input>
                        <label htmlFor="managed">Managed</label>
                    </div>
                </div>
            </div>
            {/* INFO */}
            <div className="flex flex-col w-fit">
                <div>
                    <label className="block" htmlFor="securityContact">Security contact</label>
                    <input id="securityContact" placeholder="security@example.com" type="text" className="rounded indent-2"></input>
                </div>
                <div>
                    <label className="block" htmlFor="license">License</label>
                    <input id="license" type="text" className="rounded indent-2" value={'MIT'}></input>
                </div>
            </div>
        </div>
    )
}
export default TokenOption;