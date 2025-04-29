import { makeAutoObservable } from "mobx";

import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

type ModalContext =
  AppStore["stores"]["modalStore"]["state"]["record"]["context"];

export class RecordModalController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  openModal = (context?: ModalContext) => {
    const { modalStore } = this.appStore.stores;
    modalStore.openModal("record", context);
  };

  closeModal = () => {
    const { modalStore } = this.appStore.stores;
    modalStore.closeModal("record");
  };

  get modalState() {
    const { modalStore } = this.appStore.stores;
    return modalStore.state.record;
  }
}
