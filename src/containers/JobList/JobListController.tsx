import { PaginatedListController } from "controllers/PaginatedListController";
import { Job } from "repositories/JobRepository";


export class JobListController extends PaginatedListController<Job> {
  getRepository = () => {
    const { repos } = this.appStore;
    return repos.job;
  }
}
