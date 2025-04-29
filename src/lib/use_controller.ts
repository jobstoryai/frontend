import { useState } from "react";

import { useStore } from "stores/use_store";

/**
 * Initializes a controller class with basic class parameters
 */
export const useController = <T extends new (args: any) => any>(
  Controller: T,
  options?: Omit<ConstructorParameters<T>[0], "appStore">,
): InstanceType<T> => {
  const appStore = useStore();
  const _options = { appStore, ...(options || []) };
  const [controller] = useState(() => new Controller(_options));
  return controller;
};
