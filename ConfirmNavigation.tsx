import React, { useState, useCallback } from "react";
import { useBlocker } from "./NavigationGuard";

type Props = {
  when: boolean;
};

const ConfirmNavigation: React.FC<Props> = ({ when }) => {
  const [showModal, setShowModal] = useState(false);
  const [nextLocation, setNextLocation] = useState<any>(null);
  const [retryFunc, setRetryFunc] = useState<(() => void) | null>(null);

  const blocker = useCallback(
    (tx: any) => {
      if (!when) {
        tx.retry();
        return;
      }
      setShowModal(true);
      setNextLocation(tx.location);
      setRetryFunc(() => () => tx.retry());
    },
    [when]
  );

  useBlocker(blocker, when);

  const handleConfirm = () => {
    setShowModal(false);
    retryFunc?.();
  };

  const handleCancel = () => {
    setShowModal(false);
    setNextLocation(null);
    setRetryFunc(null);
  };

  return showModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4">You have unsaved changes. Do you really want to leave?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={handleCancel}
          >
            No
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmNavigation;
