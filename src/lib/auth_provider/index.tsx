import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { observer } from "mobx-react";
import { useStore } from "stores/use_store";
import { getLogger } from "lib/logger";
import Keycloak from "keycloak-js";
import { MayBeAsync } from "types";

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

const keycloak = new Keycloak({
  url: process.env.NEXT_KEYCLOAK_URL,
  realm: process.env.NEXT_KEYCLOAK_REALM,
  clientId: process.env.NEXT_KEYCLOAK_CLIENT_ID,
  checkLoginIframe: false,
});

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
  }, []);

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
