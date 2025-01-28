import { makeAutoObservable, runInAction } from "mobx";
import { Node } from "repositories/NodeRepository";
import { NodeTag, NodeTagPayload } from "repositories/NodeTagsRepository";
import { AppStore } from "stores/AppStore";

interface Options {
  appStore: AppStore;
}

export class NodeTagFormController {
  private appStore: AppStore
  isLoading = false;
  isModifying = false;
  data: NodeTag | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  load = async (id: number) => {
    const { repos } = this.appStore;
    this.isLoading = true;
    const item = await repos.nodeTag.get(id);

    runInAction(() => {
      this.data = item;
      this.isLoading = false;
    });
  }

  create = async (payload: NodeTagPayload) => {
    const { repos, toastStore } = this.appStore;

    try {
      this.isModifying = true;
      const item = await repos.nodeTag.create(payload);
      toastStore.show("success", `${item.title} has been created`);
    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
  }

  update = async (id: number, payload: any) => {
    const { repos, toastStore } = this.appStore;

    try {
      this.isModifying = true;

      const item = await repos.nodeTag.update(id, payload);
      toastStore.show("success", `${item.title} has been updated`);

    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
  };


  onDelete = async(id: number) => {
    const { repos, toastStore } = this.appStore;
    const title = this.data?.title;
    const yes = confirm(`Delete ${title} tag?`);

    if (yes) {
      try {
        const item = await repos.nodeTag.delete(id);
        toastStore.show("success", `${title} has been deleted`);
      } catch (e) {
        console.log(e);
        toastStore.show("error", "Something went wrong");
      }
    }
  }
}
