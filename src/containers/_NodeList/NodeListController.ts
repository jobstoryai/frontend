import { PaginatedListController } from "controllers/PaginatedListController";
import { runInAction } from "mobx";
import { Node } from "repositories/NodeRepository";
import { NodeTag } from "repositories/NodeTagsRepository";

export class NodeListController extends PaginatedListController<Node> {
  tags: NodeTag[] = [];

  preload = async () => {
    const { repos } = this.appStore;
    const [tags] = await repos.nodeTag.list();

    runInAction(() => {
      this.tags = tags;
    });
  };

  getRepository = () => {
    const { repos } = this.appStore;
    return repos.node;
  };
}
