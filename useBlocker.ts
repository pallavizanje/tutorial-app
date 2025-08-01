// hooks/useBlocker.ts
import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext
} from "react-router-dom";

type Transition = {
  retry: () => void;
  location: Location;
  action: string;
};

export function useBlocker(blocker: (tx: Transition) => void, when = true) {
  const navigator = useContext(NavigationContext).navigator as any;

  useEffect(() => {
    if (!when) return;

    if (!navigator.block) {
      console.error("navigator.block is not available. Ensure you're using <BrowserRouter>.");
      return;
    }

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
