---
to: src/containers/<%= h.changeCase.snakeCase(name) %>/controller.ts
---
import { makeAutoObservable, runInAction } from "mobx";
import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class <%=name%>Controller {
  private appStore: AppStore
  isLoading = false;
  data: any | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: number) {
    const { repos } = this.appStore;
    this.isLoading = true;
    this.data = "<%=name%>";


    runInAction(() => {
      this.isLoading = false;
    });
  }
}
