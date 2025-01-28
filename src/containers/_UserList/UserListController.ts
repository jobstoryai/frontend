import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/AppStore";
import { PublicUser } from "repositories/UserRepository";

import { PAGE_SIZE } from "config";

import { Paginated } from "types";

interface Options {
  appStore: AppStore;
}

export class UserListController {
  private appStore: AppStore;

  isLoading = true;
  data: Paginated<PublicUser> = {
    count: 0,
    items: [],
    size: PAGE_SIZE,
    page: 1,
  }

  page = 1
  pageSize = 50

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }
  
  load = async (page: number) => {
    const { repos } = this.appStore;

    this.isLoading = true;
    this.data.items = [];
    this.data.page = page

    const [users, { count }] = await repos.publicUser.list(this.data.page, {
      queryParams: {
        page_size: this.data.size,
      },
    })

    runInAction(() => {
      this.data.items = users;
      this.data.count = count;
      this.isLoading = false;
    });
  }
}
