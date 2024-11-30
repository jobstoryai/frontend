import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/use_store";
import { useAuth } from "lib/auth_provider";

const UserInfo = observer(() => {
  //const appStore = useStore()
  const auth = useAuth();

  if (!auth.isReady) {
    return "Loading";
  }

  if (!auth.token) {
    return <button onClick={() => auth.login()}>Login</button>;
  }

  return (
    <div>
      <div>Token: {auth.token}</div>
      <div>Refresh Token: {auth.refreshToken}</div>
      <div>isReady: {auth.isReady}</div>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );

  //useEffect(() => {
  //  if (initialized && keycloak.authenticated) {
  //    setUserInfo(keycloak.tokenParsed);
  //  }
  //}, [initialized, keycloak]);
  //
  //if (!initialized) {
  //  return <div>Loading...</div>;
  //}
  //
  //if (!keycloak.authenticated) {
  //  return <button onClick={() => keycloak.login()}>Login</button>;
  //}
  //
  //return (
  //  <div>
  //    <h1>Welcome, {userInfo?.preferred_username || "User"}!</h1>
  //    <p>Email: {userInfo?.email || "Not available"}</p>
  //    <p>First Name: {userInfo?.given_name || "Not available"}</p>
  //    <p>Last Name: {userInfo?.family_name || "Not available"}</p>
  //    <button onClick={() => keycloak.logout()}>Logout</button>
  //  </div>
  //);
});

export const LoginPageTemporaryContainer = observer(() => {
  return <UserInfo />;
  //return (
  //  <ReactKeycloakProvider authClient={keycloak}>
  //    <div>
  //      <UserInfo />
  //    </div>
  //  </ReactKeycloakProvider>
  //);
});
