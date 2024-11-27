import React from "react";
import { observer } from "mobx-react-lite";
import { SearchResultsPageContainer } from "containers/SearchResultsPage";

const Page = observer(() => {
  return <SearchResultsPageContainer />;
});

export default Page;
