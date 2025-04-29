import { pagination, repositories, serializers } from "client-rest-framework";
import { NumberField } from "client-rest-framework/build/main/serializers";

import { GetDomainModel, GetRequestPayload } from "types";

import { API } from "./apis/api";
import { DateOnlyField } from "./fields/date_only_field";
import { DateOnlyOptionalField } from "./fields/date_only_optional_field";

export interface JobDTO {
  id: number;
  company: string;
  position: string;
  description: string;
  started: string;
  finished: string | null;
}

export type Job = GetDomainModel<JobSerializer>;
export type JobPayload = GetRequestPayload<JobSerializer>;

class JobsApi extends API<JobDTO> {
  pagination = new pagination.NoPagination() as any;
  url = "/api/jobs";
}

export class JobSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<JobDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  company = new serializers.StringField();
  position = new serializers.StringField();
  description = new serializers.StringField();
  started = new DateOnlyField();
  finished = new DateOnlyOptionalField();
  records = new NumberField({ readonly: true });
  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class JobsApiRepository extends repositories.APIRepository {
  api = new JobsApi();
  serializer = new JobSerializer();
}
