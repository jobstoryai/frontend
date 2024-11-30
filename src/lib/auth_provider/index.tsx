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

const log = getLogger(["providers", "AuthProvider"]);

const AuthContext = createContext<{
  login: () => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  refreshToken: string | null;
  isReady: boolean;
}>({
  login: async () => {},
  logout: async () => {},
  token: null,
  refreshToken: null,
  isReady: false,
});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

const keycloak = new Keycloak({
  url: "http://localhost:8100",
  realm: "jobstory",
  clientId: "jobstory-frontend",
  checkLoginIframe: false,
});

export const AuthProvider = observer(({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const { authStore } = useStore();
  const tokens = authStore.tokens;

  useEffect(() => {
    if (!authStore.isReady) {
      return;
    }

    const config = {
      token: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
      checkLoginIframe: false,
    };

    log(
      `Initialize keycloak with config ${JSON.stringify(
        {
          ...config,
          token: tokens?.accessToken
            ? `${tokens.accessToken.slice(0, 10)}...${tokens.accessToken.slice(-10)}`
            : null,
          refreshToken: tokens?.refreshToken
            ? `${tokens.refreshToken.slice(0, 10)}...${tokens.refreshToken.slice(-10)}`
            : undefined,
        },
        null,
        2,
      )}`,
    );

    keycloak.init(config).then(() => {
      if (keycloak.token && keycloak.refreshToken) {
        log(`Received tokens ${JSON.stringify(
          {
            accessToken: `${keycloak.token.slice(0, 10)}...${keycloak.token.slice(-10)}`,
            refreshToken: `${keycloak.refreshToken.slice(0, 10)}...${keycloak.refreshToken.slice(-10)}`,
          },
          null,
          2,
        )}
        `);
        authStore.setTokens({
          accessToken: keycloak.token,
          refreshToken: keycloak.refreshToken,
        });
      }
      setIsReady(true);
    });
  }, [authStore.isReady]);

  return (
    <AuthContext.Provider
      value={{
        login: keycloak.login,
        logout: keycloak.logout,
        token: keycloak.token,
        refreshToken: keycloak.refreshToken,
        isReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
