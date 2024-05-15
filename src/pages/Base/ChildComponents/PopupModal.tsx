import React from "react";

export const PopupModal: React.FC<{ type: string; onClose: () => void }> = ({
  type,
  onClose,
}) => {
  return (
    <div
      id="popup-modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded shadow-lg">
        <div className="p-4 md:p-5 text-center">
          <svg
            className={
              type == "success"
                ? "mx-auto mb-4 text-green-400 w-12 h-12 dark:text-gray-200"
                : "mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            }
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            {type == "success" && (
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
            )}
            <path
              d={
                type == "success"
                  ? "M6 10l2 2 6-6"
                  : "M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              }
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {type == "success"
              ? "Deloy Contract Success! "
              : "Deloy Contract Failed"}
          </h3>
          <button
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={onClose}
          >
            {type == "success" ? "Done" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
