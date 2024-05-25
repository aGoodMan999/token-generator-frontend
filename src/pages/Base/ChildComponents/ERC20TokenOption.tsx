import React from "react";
import Tooltip from "./Tooltip";
import { TokenOptions } from "../Base";
import Vote_Dev from "../../../enums/Vote_Dev";
import AccessControl_Dev from "../../../enums/AccessControl_Dev";
type TokenOptionProps = {
  option: TokenOptions;
  setOption: (option: TokenOptions) => void;
};
const ERC20TokenOption: React.FC<TokenOptionProps> = (props) => {
  const {
    name,
    symbol,
    premint,
    license,
    ismintable,
    isburnable,
    ispausable,
    ispermit,
    isflashmintable: isflashMinting,
    votes,
    accesscontrol,
  } = props.option;
  // HANDLE CHANGE
  const handleAccessControlChange = (ac: AccessControl_Dev) => {
    if (ac === AccessControl_Dev.NONE && props.option.ismintable) {
      alert("You can't disable access control when mintable is enabled");
      return;
    }
    props.setOption({ ...props.option, accesscontrol: ac });
  };
  const handleVoteChange = (votes: Vote_Dev) => {
    props.setOption({ ...props.option, votes: votes });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, name: e.target.value });
  };
  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, symbol: e.target.value });
  };
  const handlePremintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      props.setOption({ ...props.option, premint: 0 });
    } else {
      props.setOption({ ...props.option, premint: parseInt(e.target.value) });
    }
  };
  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, license: e.target.value });
  };
  const handleMintableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Mintable change");
    if (accesscontrol === AccessControl_Dev.NONE) {
      console.log("Access control is none");
      props.setOption({
        ...props.option,
        accesscontrol: AccessControl_Dev.OWNABLE,
        ismintable: e.target.checked,
      });
    } else {
      props.setOption({ ...props.option, ismintable: e.target.checked });
    }
  };
  const handleBurnableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, isburnable: e.target.checked });
  };
  const handlePausableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, ispausable: e.target.checked });
  };
  const handlePermitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, ispermit: e.target.checked });
  };
  const handleFlashMintingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setOption({ ...props.option, isflashmintable: e.target.checked });
  };

  interface RadioProps {
    isChecked?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    tooltipMessage: string;
  }

  interface CheckboxProps {
    isChecked?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    tooltipMessage: string;
    isHeader?: boolean;
  }

  const Radio: React.FC<RadioProps> = ({
    isChecked,
    handleChange,
    label,
    tooltipMessage,
  }) => {
    return (
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center mb-0">
          <input
            id={label}
            type="radio"
            checked={isChecked}
            name={label}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
          />
          <label
            htmlFor={label}
            className="ms-2 text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
        <Tooltip message={tooltipMessage} />
      </div>
    );
  };

  const CheckBox: React.FC<CheckboxProps> = ({
    isChecked,
    handleChange,
    label,
    tooltipMessage,
    isHeader = false,
  }) => {
    return (
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center mb-0">
          {isHeader && (
            <label
              htmlFor={label}
              className="ms-0 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          )}
          <input
            id={label}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${
              isHeader && "ml-2"
            } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600`}
          />
          {!isHeader && (
            <label
              htmlFor={label}
              className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          )}
        </div>
        <Tooltip message={tooltipMessage} />
      </div>
    );
  };

  return (
    <div className="token-option-container">
      {/* SETTING */}
      <div id="setting">
        <aside
          id="default-sidebar"
          className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 w-100000 bg-gray-50 dark:bg-gray-800">
            {/* <ul className="space-y-2 font-medium"></ul> */}
            <h1>Setting</h1>
            <div className="ms-2">
              <div className="grid gap-3 mb-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleNameChange}
                    value={name}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="symbol"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Symbol
                  </label>
                  <input
                    onChange={handleSymbolChange}
                    value={symbol}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="MKT"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="premint"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Premint
                </label>
                <input
                  onChange={handlePremintChange}
                  value={premint}
                  type="text"
                  id="premint"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
                {/* </div> */}
              </div>
            </div>
            {/* FEATURES */}
            <div className="flex flex-col">
              <h1>Features</h1>
              <div className="ms-2">
                <div className="flex items-center justify-between mb-4"></div>
                <CheckBox
                  handleChange={handleMintableChange}
                  isChecked={ismintable}
                  label="Mintable"
                  tooltipMessage="Privileged accounts will be able to create more supply."
                />
                <CheckBox
                  handleChange={handleBurnableChange}
                  isChecked={isburnable}
                  label="Burnable"
                  tooltipMessage="Token holders will be able to destroy their tokens."
                />
                <CheckBox
                  handleChange={handlePausableChange}
                  isChecked={ispausable}
                  label="Pausable"
                  tooltipMessage="Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response."
                />{" "}
                <CheckBox
                  handleChange={handlePermitChange}
                  isChecked={ispermit}
                  label="Permit"
                  tooltipMessage="Without paying gas, token holders will be able to allow third parties to transfer from their account."
                />{" "}
                <CheckBox
                  handleChange={handleFlashMintingChange}
                  isChecked={isflashMinting}
                  label="Flash Minting"
                  tooltipMessage="Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction."
                />
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* VOTE */}
            <div className="flex flex-col">
              <CheckBox
                handleChange={() => {
                  handleVoteChange(
                    votes === Vote_Dev.NONE
                      ? Vote_Dev.BLOCK_NUMBER
                      : Vote_Dev.NONE
                  );
                }}
                isChecked={votes !== Vote_Dev.NONE}
                label="Vote"
                tooltipMessage="Keeps track of historical balances for voting in on-chain governance, with a way to delegate one's voting power to a trusted account."
                isHeader={true}
              />
              <div className="ms-2">
                <Radio
                  isChecked={votes === Vote_Dev.BLOCK_NUMBER}
                  label="Block Number"
                  tooltipMessage="Uses voting durations expressed as block numbers."
                  handleChange={() => {
                    handleVoteChange(1);
                  }}
                />
                <Radio
                  isChecked={votes === Vote_Dev.TIMESTAMP}
                  label="Timestamp"
                  tooltipMessage="Uses voting durations expressed as timestamps."
                  handleChange={() => {
                    handleVoteChange(2);
                  }}
                />{" "}
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* ACCESS CONTROL */}
            <div className="flex flex-col">
              <div>
                <CheckBox
                  handleChange={() =>
                    handleAccessControlChange(
                      accesscontrol === AccessControl_Dev.NONE
                        ? AccessControl_Dev.OWNABLE
                        : AccessControl_Dev.NONE
                    )
                  }
                  isChecked={
                    props.option.accesscontrol !== AccessControl_Dev.NONE
                  }
                  label="Access control"
                  tooltipMessage="Restrict who can access the functions of a contract or when they can do it."
                  isHeader={true}
                />
              </div>
              <div className="ms-2">
                <Radio
                  handleChange={() => {
                    handleAccessControlChange(1);
                  }}
                  label="Ownable"
                  tooltipMessage="Simple mechanism with a single account authorized for all privileged actions."
                  isChecked={
                    props.option.accesscontrol === AccessControl_Dev.OWNABLE
                  }
                />
                <Radio
                  handleChange={() => {
                    handleAccessControlChange(2);
                  }}
                  label="Roles"
                  tooltipMessage="Flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts."
                  isChecked={
                    props.option.accesscontrol === AccessControl_Dev.ROLES
                  }
                />{" "}
                <Radio
                  handleChange={() => {
                    handleAccessControlChange(3);
                  }}
                  label="Managed"
                  tooltipMessage="Enables a central contract to define a policy that allows certain callers to access certain functions."
                  isChecked={
                    props.option.accesscontrol === AccessControl_Dev.MANAGED
                  }
                />
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* UPGRADEABILITY */}
            <div className="flex flex-col">
              <CheckBox
                handleChange={() => {}}
                label="Upgradeability"
                tooltipMessage="Smart contracts are immutable by default unless deployed behind an upgradeable proxy."
                // isChecked={false}
                isHeader={true}
              />

              <div className="ms-2">
                <Radio
                  label="Transparent"
                  handleChange={() => {}}
                  tooltipMessage="Uses more complex proxy with higher overhead, requires less changes in your contract. Can also be used with beacons."
                  isChecked={false}
                />
                <Radio
                  label="UUPS"
                  handleChange={() => {}}
                  tooltipMessage="Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades."
                  isChecked={false}
                />
                <Radio
                  label="Managed"
                  handleChange={() => {}}
                  tooltipMessage=""
                  isChecked={false}
                />
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* INFO */}
            <div className="flex flex-col ">
              <div>
                <label
                  htmlFor="securityContact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Security contact
                </label>
                <input
                  // onChange={handleNameChange}
                  // value={name}
                  type="text"
                  id="securityContact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="security@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="license"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  License
                </label>
                <input
                  onChange={handleLicenseChange}
                  value={license}
                  type="text"
                  id="license"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="MIT"
                  required
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default ERC20TokenOption;
