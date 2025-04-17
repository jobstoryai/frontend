import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// @ts-ignore
import Keycloak from "keycloak-js";
import { observer } from "mobx-react";

import { useStore } from "stores/use_store";
import { getLogger } from "lib/logger";

import { MayBeAsync } from "types";
import { isServer } from "lib/is_server";

const log = getLogger(["providers", "AuthProvider"]);

const AuthContext = createContext<{
  login: () => MayBeAsync<void>;
  logout: () => MayBeAsync<void>;
  isAuthenticated: boolean;
}>({
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}


const keycloak = !isServer ? new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  checkLoginIframe: false,
}) : null;

let isKeycloakInitialized = false;

// TODO: It seems like it can be moved into AuthStore
export const AuthProvider = observer(({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const { authStore } = useStore();
  const accessToken = authStore.token;

  useEffect(() => {
    if (keycloak.initialized || isKeycloakInitialized) {
      return;
    }

    keycloak.init({ checkLoginIframe: false }).then(async () => {
      if (keycloak.token) {
        log(`Received token ${keycloak.token}`);
        authStore.setToken(keycloak.token);
      }
      if (authStore.token) {
        await authStore.pullUser();
      }
      setIsReady(true);
      authStore.isReady = true;
      isKeycloakInitialized = true;
    });
  }, [authStore]);

  return (
    <AuthContext.Provider
      value={{
        login: keycloak.login,
        logout: () => {
          authStore.logout();
          keycloak.logout();
        },
        isAuthenticated: Boolean(accessToken),
      }}
    >
      {isReady ? children : "Loading..."}
    </AuthContext.Provider>
  );
});
