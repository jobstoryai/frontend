import { makeAutoObservable, runInAction } from "mobx";
import router from "next/router";

import { AppStore } from "stores/app_store";
import { Cv, CvPayload, CvsApiRepository } from "repositories/cv_repository";

interface Options {
  appStore: AppStore;
}

export class CvSettingsController {
  private appStore: AppStore;
  isLoading = false;
  isUpdating = false;
  isCreatingVersion = false;
  data: Cv | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: number) {
    const { repos } = this.appStore;
    this.isLoading = true;

    const cv = await repos.cvs.get(id);

    runInAction(() => {
      this.data = cv;
      this.isLoading = false;
    });
  }

  create = async (payload: CvPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    this.isUpdating = true;

    try {
      const cv = await repos.cvs.create(payload);
      runInAction(() => {
        this.data = cv;
        toastStore.show("success", "Settings has been updated!");
        router.replace(`/cvs/${cv.id}`);
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isUpdating = false;
      });
    }
  };

  update = async (id: number, payload: CvPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    this.isUpdating = true;

    try {
      const cv = await repos.cvs.update(id, payload);
      runInAction(() => {
        this.data = cv;
        toastStore.show("success", "Settings has been updated!");
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isUpdating = false;
      });
    }
  };

  delete = async (id: number) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    try {
      const confirmed = confirm(
        "Do you really want to delete this CV? This can't be undone",
      );

      if (!confirmed) {
        return;
      }

      await repos.cvs.delete(id);
      runInAction(() => {
        toastStore.show("success", "CV has been deleted!");
        router.push("/cvs/");
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {});
    }
  };

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
      runInAction(() => {
        this.data!.versions = updatedCv.versions;
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
