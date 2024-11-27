import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { SearchResultsPageView } from "./SearchResultsPageView";
import { SearchResultsPageController } from "./SearchResultsPageController";

export const SearchResultsPageContainer = observer(() => {
  const controller = useController(SearchResultsPageController, {});

  useEffect(() => {
    controller.load(1);
  }, []);

  return (
    <SearchResultsPageView
      dataPage={controller.data}
      isLoading={controller.isLoading || !controller.isInitialized}
      onSearch={async (values) => {
        await controller.load(1, values as any);
      }}
      onSearchNodes={controller.searchNodes}
      onPageChange={() => {
        controller.load;
      }}
      onPageSizeChange={(size) => controller.setPageSize(size)}
    />
  );
});
