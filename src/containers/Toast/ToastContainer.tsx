import React, { useEffect } from "react";
import { message } from "antd";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/useStore";

export const ToastContainer = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const { toastStore } = useStore();

  useEffect(() => {
    toastStore.setMessageApi(messageApi)
  }, [])

  return (
    <>
      {contextHolder}
    </>
  )
});
