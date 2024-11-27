import { pagination, repositories, serializers } from "client-rest-framework";
import { API } from "./apis/Api";
import { PublicUserDTO, PublicUserSerializer } from "./UserRepository";
import { GetDomainModel, GetRequestPayload } from "./types";
import { NodeDTO, NodeSerializer } from "./NodeRepository";


export interface JobDTO {
  id: number;
  title: string;
  content: string;
  company: string;
  url: string;
  required_skills: NodeDTO[]
  good_to_have_skills: NodeDTO[]
  created_at: string;
  updated_at: string;
  created_by: PublicUserDTO;
}

export type Job = GetDomainModel<JobSerializer>
export type JobPayload = GetRequestPayload<JobSerializer>;

class JobApi extends API<JobDTO> {
  url = "/api/jobs";
}

class FKNodeSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends NodeSerializer<R, M> {
  // @ts-ignore
  toDTO = (data: any) => Number(data);
}

export class JobSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<NodeDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  title = new serializers.StringField();
  content = new serializers.StringField();
  company = new serializers.StringField();
  url = new serializers.StringField();

  required_skills = new FKNodeSerializer({ many: true })
  good_to_have_skills = new FKNodeSerializer({ many: true })

  salary_from = new serializers.NumberField();
  salary_to = new serializers.NumberField();
  currency = new serializers.StringField();

  country = new serializers.EnumField<string | null>();
  city = new serializers.EnumField<string | null>();

  score = new serializers.NumberField();
  matched_r_skills = new serializers.NumberField();
  matched_gh_skills = new serializers.NumberField();


  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
  created_by = new PublicUserSerializer({ readonly: true })
}


export class JobRepository extends repositories.APIRepository {
  api = new JobApi();
  serializer = new JobSerializer();
}

