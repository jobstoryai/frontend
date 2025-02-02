import { makeAutoObservable, runInAction } from "mobx";
import { RecordPayload } from "repositories/record_repository";
import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class RecordFormController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get isCreating() {
    const { recordsStore } = this.appStore.stores;
    return !recordsStore.state.isCreating;
  }

  create = async (payload: RecordPayload) => {
    const { recordsStore } = this.appStore.stores;
    recordsStore.create(payload);
  };
}
