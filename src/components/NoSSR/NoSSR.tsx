import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";

interface Props {
  children: ReactNode;
}

const NonSSRWrapper = observer(({ children }: Props) => (
  <React.Fragment>{children}</React.Fragment>
));

export const NoSSR =  dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
