import { PaginatedListController } from "controllers/PaginatedListController";
import { NodeTag } from "repositories/NodeTagsRepository";


export class NodeTagsController extends PaginatedListController<NodeTag> {
  getRepository = () => {
    const { repos } = this.appStore;
    return repos.nodeTag;
  }
}
