import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountContext";

type DeploymentCardProps = {
  name: string;
  address: string;
  hashs: string;
  blockNumber: number;
  chainId: number;
  networkName: string;
  timeStamp: number;
};

const DeploymentCard: React.FC<DeploymentCardProps> = (props) => {
  const { account } = useContext(AccountContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const date = new Date(props.timeStamp * 1000);
  const formattedDate = date.toLocaleString();

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">
            Account Deloyment
          </div>
          <div className="mb-2 text-gray-600">Name: {props.name}</div>
          <div className="mb-2 text-gray-600">
            Block Number: {props.blockNumber}
          </div>
          <div className="mb-2 text-gray-600">
            Network name: {props.networkName}
          </div>
          <div className="mb-2 text-gray-600">Created: {formattedDate}</div>
          <a
            href="#"
            className="my-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={toggleModal}
          >
            Show full infor
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-auto mx-auto max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Deloy Information
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Name: {props.name}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Address: {props.address}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Owner: {account ?? ""}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Block Number: {props.blockNumber}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Deploy hash: {props.hashs}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Chain ID: {props.chainId}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Network Name: {props.networkName}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Created: {formattedDate}
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className=" flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentCard;
