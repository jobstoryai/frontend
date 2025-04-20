"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Keycloak from "keycloak-js";
import { observer } from "mobx-react";

import { useStore } from "stores/use_store";
import { getLogger } from "lib/logger";

const log = getLogger(["providers", "AuthProvider"]);

const AuthContext = createContext<{
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}>({
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

export const AuthProvider = observer(({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const { authStore } = useStore();
  const accessToken = authStore.token;

  useEffect(() => {
    const kc = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
    });

    kc.init({
      checkLoginIframe: false,
    })
      .then(() => {
        setKeycloak(kc);
        if (kc.token) {
          log(`Received token ${kc.token}`);
          authStore.setToken(kc.token);
        }
        if (authStore.token) {
          authStore.pullUser();
        }
        setIsReady(true);
        authStore.isReady = true;
        log("Keycloak initialized");
      })
      .catch((err) => {
        console.error("Keycloak init failed", err);
        setIsReady(true);
      });
  }, [authStore]);

  const login = useMemo(() => {
    return keycloak ? () => keycloak.login() : async () => {};
  }, [keycloak]);

  const logout = useMemo(() => {
    return () => {
      authStore.logout();
      keycloak?.logout();
    };
  }, [keycloak, authStore]);

  const isAuthenticated = Boolean(accessToken);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {isReady ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
});
