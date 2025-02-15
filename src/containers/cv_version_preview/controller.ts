import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { CvVersion } from "repositories/cv_version_repsitory";

interface Options {
  appStore: AppStore;
}

export class CvVersionPreviewController {
  private appStore: AppStore;
  isLoading = false;
  data: CvVersion | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: string) {
    const { repos } = this.appStore;
    this.isLoading = true;

    const cvVersion = await repos.cvVersions.get(id as any);
    runInAction(() => {
      this.data = cvVersion;
      this.isLoading = false;
    });
  }
}
