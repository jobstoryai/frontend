import React, { useContext } from "react";
import { enableStaticRendering } from "mobx-react-lite";

import { AppStore } from "./app_store";

// there is no window object on the server
enableStaticRendering(typeof window === "undefined");

// local module level variable - holds singleton store
let store: AppStore;

// function to initialize the store
function initializeStore(): AppStore {
  const _store = store ?? new AppStore();

  // For server side rendering always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  // @ts-ignore
  window.app = store;

  return _store;
}

const AppStoreContext = React.createContext<AppStore>({} as AppStore);

interface Props {
  children: React.ReactNode;
}

export const AppStoreProvider = ({ children }: Props) => {
  const store = initializeStore();

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
};

/**
 * Returns a store from store locator by it's serviceId
 */
export const useStore = () => useContext(AppStoreContext);

