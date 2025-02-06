import React, { useEffect } from "react";
import { message } from "antd";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/use_store";

export const ToastContainer = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const { stores } = useStore();

  useEffect(() => {
    stores.toastStore.setMessageApi(messageApi);
  }, [stores.toastStore, messageApi]);

  return <>{contextHolder}</>;
});
