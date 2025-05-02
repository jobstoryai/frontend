import { makeAutoObservable, runInAction } from "mobx";
import router from "next/router";

import { AppStore } from "stores/app_store";
import { Cv, CvPayload, CvsApiRepository } from "repositories/cv_repository";
import { CvVersion } from "repositories/cv_version_repsitory";

interface Options {
  appStore: AppStore;
}

export class CvPageController {
  private appStore: AppStore;
  isLoading = true;
  isUpdating = false;
  isCreatingVersion = false;
  data: Cv | null = null;
  latestVersion: CvVersion | null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get isCvLoading() {
    const {
      stores: { cvsStore, cvVersionsStore },
    } = this.appStore;

    return (
      cvsStore.state.isLoadingOne ||
      cvVersionsStore.state.isLoadingOne ||
      this.isLoading
    );
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

  createVerion = async () => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    const id = this.data?.id;

    if (!id) {
      throw new Error("CV isn't fetched yet");
    }

    try {
      this.isCreatingVersion = true;
      await repos.cvVersions.create({ cv: id, is_active: false });
      const updatedCv = await repos.cvs.get(id);
      let version: CvVersion | null = null;

      if (updatedCv.latest_version) {
        version = await repos.cvVersions.get(updatedCv.latest_version as any);
      }

      runInAction(() => {
        this.data!.versions = updatedCv.versions;
        this.data!.latest_version = updatedCv.latest_version;
        this.latestVersion = version;
        toastStore.show("success", "Resume was updated!");
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.isCreatingVersion = false;
      });
    }
  };
}
