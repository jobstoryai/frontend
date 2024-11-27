import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { observer } from "mobx-react";
import { useStore } from "stores/use_store";
import { keycloak } from "./keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

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

export const AuthProvider = observer(({ children }: Props) => {
  const { authStore } = useStore();
  const tokens = authStore.tokens;

  console.log("tokens", tokens);
  console.log("authStore", authStore.isReady);

  //if (!authStore.isReady) {
  //  return "Loading";
  //}
  //
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        token: tokens?.accessToken,
        refreshToken: tokens?.refreshToken,
        checkLoginIframe: false,
      }}
    >
      <AuthInternalProvider>{children}</AuthInternalProvider>
    </ReactKeycloakProvider>
  );
});

interface AuthInternalProviderProps {
  children: ReactNode;
}

const AuthInternalProvider = observer(
  ({ children }: AuthInternalProviderProps) => {
    const { keycloak, initialized } = useKeycloak();
    const { authStore } = useStore();

    useEffect(() => {
      if (keycloak.token) {
        authStore.setTokens({
          accessToken: keycloak.token,
          refreshToken: keycloak.refreshToken,
        });
      }
    }, [keycloak.token]);

    return (
      <AuthContext.Provider
        value={{
          login: keycloak.login,
          logout: keycloak.logout,
          token: keycloak.token,
          refreshToken: keycloak.refreshToken,
          isReady: initialized,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  },
);

//export const AuthProvider = observer(({ children, onReady }: Props) => {
//  //const [isReady, setIsReady] = useState(false);
//  //const { authStore } = useStore();
//  //useEffect(() => {
//  //  authStore.setTokenExpiredCallback(logout);
//  //
//  //  (async () => {
//  //    try {
//  //      const authenticated = await keycloak.init({
//  //        onLoad: "check-sso",
//  //        silentCheckSsoRedirectUri:
//  //          window.location.origin + "/silent-check-sso.html",
//  //      });
//  //
//  //      if (authenticated) {
//  //        authStore.setAccessToken(keycloak.token || "");
//  //        keycloak.onTokenExpired = async () => {
//  //          try {
//  //            await keycloak.updateToken(30); // Refresh token if it will expire in 30 seconds
//  //            authStore.setAccessToken(keycloak.token || "");
//  //          } catch {
//  //            await logout();
//  //          }
//  //        };
//  //      }
//  //    } catch (error) {
//  //      console.error("Keycloak initialization failed", error);
//  //    } finally {
//  //      setIsReady(true);
//  //      onReady?.();
//  //    }
//  //  })();
//  //}, [onReady]);
//  //
//  //const login = async () => {
//  //  try {
//  //    await keycloak.login();
//  //    if (keycloak.token) {
//  //      authStore.setAccessToken(keycloak.token);
//  //    }
//  //  } catch (error) {
//  //    console.error("Keycloak login failed", error);
//  //  }
//  //};
//
//  //const logout = async () => {
//  //  try {
//  //    await keycloak.logout();
//  //    //authStore.clearToken();
//  //  } catch (error) {
//  //    console.error("Keycloak logout failed", error);
//  //  }
//  //};
//
//  const { authStore } = useStore();
//
//  return (
//    <AuthContext.Provider value={{ login, logout, isReady }}>
//      {children}
//    </AuthContext.Provider>
//  );
//});
