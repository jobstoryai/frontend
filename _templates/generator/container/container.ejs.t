---
to: src/containers/<%=name%>/<%=name%>Container.tsx
---
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { <%=name%>View } from "./<%=name%>View";
import { <%=name%>Controller } from "./<%=name%>Controller";

export interface Props {
  id: number;
  // TODO: Add container props here
}

export const <%=name%>Container = observer(({ id }: Props) => {
  const instance<%=name%>Controller = useController(<%=name%>Controller, {});

  useEffect(() => {
    instance<%=name%>Controller.load(id);
  }, []);

  return (
    <<%=name%>View 
      isLoading={instance<%=name%>Controller.isLoading}
      data={instance<%=name%>Controller.data}
    />
  );
})
