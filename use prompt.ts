// hooks/usePrompt.ts
import { useContext, useEffect, useState } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function usePrompt(when: boolean) {
  const navigator = useContext(NavigationContext).navigator;
  const [showModal, setShowModal] = useState(false);
  const [nextLocation, setNextLocation] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      if (confirmed) {
        unblock();
        tx.retry();
      } else {
        setShowModal(true);
        setNextLocation(tx);
      }
    });

    return unblock;
  }, [when, confirmed, navigator]);

  const confirmNavigation = () => {
    setConfirmed(true);
    setShowModal(false);
  };

  const cancelNavigation = () => {
    setNextLocation(null);
    setShowModal(false);
  };

  return { showModal, confirmNavigation, cancelNavigation };
}
