import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/use_store";
import { useAuth } from "lib/auth_provider";
import { NoSSR } from "components/NoSSR";

const UserInfo = observer(() => {
  const { repos } = useStore();
  const auth = useAuth();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return;
    }

    (async () => {
      const res = await repos.users.get("me" as any);
      console.log(res);
      setUserData(res);
    })();
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.login()}>Login</button>;
  }

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
});

export const LoginPageTemporaryContainer = observer(() => {
  return (
    <NoSSR>
      <UserInfo />
    </NoSSR>
  );
});
