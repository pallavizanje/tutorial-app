// hooks/usePrompt.ts
import { useCallback, useState } from 'react';
import { useBlocker } from './useBlocker';

export function usePrompt(when: boolean) {
  const [showModal, setShowModal] = useState(false);
  const [tx, setTx] = useState<any>(null);

  const blocker = useCallback(
    (transition: any) => {
      setShowModal(true);
      setTx(() => transition);
    },
    []
  );

  useBlocker(blocker, when);

  const confirmNavigation = () => {
    setShowModal(false);
    tx?.retry(); // Proceed with navigation
  };

  const cancelNavigation = () => {
    setShowModal(false);
    setTx(null);
  };

  return { showModal, confirmNavigation, cancelNavigation };
}
