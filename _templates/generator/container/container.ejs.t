---
to: src/containers/<%= h.changeCase.snakeCase(name) %>/index.tsx
---
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { <%=name%>View } from "./view";
import { <%=name%>Controller } from "./controller";

export interface Props {}

export const <%=name%>Container = observer(({}: Props) => {
  const controller = useController(<%=name%>Controller, {});

  useEffect(() => {
    controller.load(1);
  }, []);

  return (
    <<%=name%>View 
      isLoading={controller.isLoading}
      data={controller.data}
    />
  );
})
