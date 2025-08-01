// hooks/useBlocker.ts
import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext
} from "react-router-dom";

export function useBlocker(blocker: (tx: any) => void, when = true) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };
      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
