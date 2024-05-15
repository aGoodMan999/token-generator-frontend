import { ChangeEvent } from "react";
import { TokenOptions } from "../Base";
import Vote_Dev from "../../../enums/Vote_Dev";
import AccessControl_Dev from "../../../enums/AccessControl_Dev";

type TokenOptionProps = {
    option: TokenOptions;
    setOption: Function;
}
const ERC721TokenOption: React.FC<TokenOptionProps> = (props) => {
    const { name, symbol, license, votes, accesscontrol, ismintable, isburnable, ispausable, isenumerable, baseuri, isautoincrementids, isuristorage } = props.option;
    // HANDLE CHANGE
    const handleAccessControlChange = (ac: AccessControl_Dev) => {
        if (ac === AccessControl_Dev.NONE && props.option.ismintable) {
            alert("You can't disable access control when mintable is enabled");
            return;
        }

        if (ac === AccessControl_Dev.NONE && props.option.ispausable) {
            alert("You can't disable access control when pausable is enabled");
            return;
        }
        props.setOption({ ...props.option, accesscontrol: ac });
    }
    const handleVoteChange = (votes: Vote_Dev) => {
        props.setOption({ ...props.option, votes: votes })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, name: e.target.value });
    }
    const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, symbol: e.target.value });
    }
    const handleBaseUriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, baseuri: e.target.value })
    }
    const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, license: e.target.value })
    }
    const handleMintableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        if (checked) {
            if (accesscontrol === AccessControl_Dev.NONE) {
                console.log("Access control is none");
                props.setOption({ ...props.option, accesscontrol: AccessControl_Dev.OWNABLE, ismintable: e.target.checked });
                return;
            }
        } else {
            if (isautoincrementids) {
                alert("You can't disable mintable when auto increment ids is enabled");
                return;
            }
        }
        props.setOption({ ...props.option, ismintable: e.target.checked });
    }
    const handleBurnableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, isburnable: e.target.checked });
    }
    const handlePausableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (accesscontrol === AccessControl_Dev.NONE) {
            props.setOption({ ...props.option, ispausable: e.target.checked, accesscontrol: AccessControl_Dev.OWNABLE });
            return;
        }

        props.setOption({ ...props.option, ispausable: e.target.checked });
    }

    const handleIsAutoIncrementIdsChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!ismintable) {
            if (accesscontrol === AccessControl_Dev.NONE) {
                props.setOption({ ...props.option, accesscontrol: AccessControl_Dev.OWNABLE, ismintable: true, isautoincrementids: e.target.checked })
                return;
            }
            else {
                props.setOption({ ...props.option, ismintable: true, isautoincrementids: e.target.checked })
                return;
            }
        }
        props.setOption({ ...props.option, isautoincrementids: e.target.checked })
    }
    const hanldeEnumerableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, isenumerable: e.target.checked });
    }
    const handleUriStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setOption({ ...props.option, isuristorage: e.target.checked });
    }

    return (
        <div className="h-full p-2 gap-y-2 ps-4 flex flex-col bg-lime-100 devide-y divide-blue-200">
            {/* SETTING */}
            <div id="setting">
                <h1>Setting</h1>
                <div className="ms-2">
                    <div className="flex gap-x-4">
                        <div className="">
                            <h2>Name</h2>
                            <input type="text" onChange={handleNameChange} value={name}></input>
                        </div>
                        <div className="">
                            <h2>Symbol</h2>
                            <input onChange={handleSymbolChange} type="text" value={symbol}></input>
                        </div>
                    </div>
                    <div>
                        <h2>Base URI</h2>
                        <input onChange={handleBaseUriChange} placeholder="https://..." type="text" value={baseuri}></input>
                    </div>
                </div>
            </div>
            {/* FEATURES */}
            <div className="flex flex-col">
                <h1>Features</h1>
                <div className="ms-2">
                    <div>
                        <div>
                            <input id="mintable" type="checkbox" checked={ismintable} onChange={handleMintableChange}></input>
                            <label htmlFor="mintable">Mintable</label>
                        </div>
                        <div>
                            {/* a space before => */}
                            <span className="mb-[5px]">&nbsp;&nbsp;&nbsp;{'+'}</span>
                            <input id="autoIncrementIds" type="checkbox" checked={isautoincrementids} onChange={handleIsAutoIncrementIdsChange}></input>
                            <label htmlFor="autoIncrementIds">Auto Increments Ids</label>
                        </div>
                    </div>
                    <div>
                        <input id="burnable" onChange={handleBurnableChange} checked={isburnable} type="checkbox"></input>
                        <label htmlFor="burnable">Burnable</label>
                    </div>
                    <div>
                        <input id="pausable" onChange={handlePausableChange} type="checkbox" checked={ispausable}></input>
                        <label htmlFor="pausable">Pausable</label>
                    </div>
                    <div>
                        <input id="enumerable" onChange={hanldeEnumerableChange} type="checkbox" checked={isenumerable}></input>
                        <label htmlFor="enumerable">Enumerable</label>
                    </div>
                    <div>
                        <input id="uriStorage" onChange={handleUriStorage} type="checkbox" checked={isuristorage}></input>
                        <label htmlFor="uriStorage">URI Storage</label>
                    </div>
                </div>
            </div>
            {/* VOTE */}
            <div className="flex flex-col">
                <div>
                    <label htmlFor="isVoted">Vote</label>
                    <input id="isVoted" type="checkbox" onChange={() => { handleVoteChange(votes === Vote_Dev.NONE ? Vote_Dev.BLOCK_NUMBER : Vote_Dev.NONE) }} checked={votes !== Vote_Dev.NONE} className="rounded-full"></input>
                </div>
                <div className="ms-2">
                    <div>
                        <input id="blockNumber" type="radio" checked={votes === Vote_Dev.BLOCK_NUMBER} onChange={() => { handleVoteChange(1) }} name="voteType" className="rounded-full"></input>
                        <label htmlFor="blockNumber">Block Number</label>
                    </div>
                    <div>
                        <input id="timeStamp" type="radio" checked={votes === Vote_Dev.TIMESTAMP} onChange={() => { handleVoteChange(2) }} name="voteType" className="rounded-full"></input>
                        <label htmlFor="timeStamp">Timestamp</label>
                    </div>
                </div>
            </div>
            {/* ACCESS CONTROL */}
            <div className="flex flex-col">
                <div>
                    <label htmlFor="accesscontrol">Access control</label>
                    <input id="accesscontrol" type="checkbox" onChange={() => handleAccessControlChange(accesscontrol === AccessControl_Dev.NONE ? AccessControl_Dev.OWNABLE : AccessControl_Dev.NONE)} checked={props.option.accesscontrol !== AccessControl_Dev.NONE} className="rounded-full"></input>
                </div>
                <div className="ms-2">
                    <div>
                        <input id="blocknumber" type="radio" checked={props.option.accesscontrol === AccessControl_Dev.OWNABLE} name="accessControlType" onChange={() => { handleAccessControlChange(1) }} className="rounded-full"></input>
                        <label htmlFor="blocknumber">Ownable</label>
                    </div>
                    <div>
                        <input id="roles" type="radio" checked={props.option.accesscontrol === AccessControl_Dev.ROLES} name="accessControlType" onChange={() => { handleAccessControlChange(2) }} className="rounded-full"></input>
                        <label htmlFor="roles">Roles</label>
                    </div>
                    <div>
                        <input id="managed" type="radio" checked={props.option.accesscontrol === AccessControl_Dev.MANAGED} name="accessControlType" onChange={() => { handleAccessControlChange(3) }} className="rounded-full"></input>
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
                    <input id="license" type="text" className="rounded indent-2" placeholder="MIT" onChange={handleLicenseChange} value={license}></input>
                </div>
            </div>
        </div>
    )
}

export default ERC721TokenOption;