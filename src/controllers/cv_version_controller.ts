import { makeAutoObservable, runInAction } from "mobx";
import router from "next/router";

import { AppStore } from "stores/app_store";
import { Cv, CvPayload, CvsApiRepository } from "repositories/cv_repository";
import { CvVersion } from "repositories/cv_version_repsitory";

interface Options {
  appStore: AppStore;
}

export class CvVersionController {
  private appStore: AppStore;
  isLoading = true;
  isUpdating = false;
  data: Cv | null = null;
  latestVersion: CvVersion | null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: number) {
    const {
      stores: { cvsStore, cvVersionsStore },
    } = this.appStore;
    this.isLoading = true;
    const cv = await cvsStore.get(id);

    if (!cv) {
      return; // TODO: not found
    }

    const { latest_version } = cv;

    let version: CvVersion | null = null;
    if (latest_version) {
      const _version = await cvVersionsStore.get(latest_version as any);
      if (_version) {
        version = _version;
      }
    }

    runInAction(() => {
      this.data = cv;
      this.latestVersion = version;
      this.isLoading = false;
    });
  }

  get isCreatingVersion() {
    const {
      stores: { cvVersionsStore },
    } = this.appStore;
    return cvVersionsStore.state.isCreating || cvVersionsStore.state.isUpdating;
  }

  create = async () => {
    const {
      stores: { toastStore, cvVersionsStore },
    } = this.appStore;
    const id = this.data?.id;

    if (!id) {
      throw new Error("CV isn't fetched yet");
    }

    try {
      const version = await cvVersionsStore.create({
        cv: id,
        is_active: false,
      });
      runInAction(() => {
        this.data!.versions.push(version);
        this.data!.latest_version = version.id;
        this.latestVersion = version;
        toastStore.show("success", "Resume was generated!");
      });
    } catch (e) {
      console.error(e);
    }
  };
}
