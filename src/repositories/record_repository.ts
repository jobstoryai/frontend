import { repositories, serializers } from "client-rest-framework";

import { GetDomainModel, GetRequestPayload } from "types";

import { API } from "./apis/api";
import { DateOnlyField } from "./fields/date_only_field";
import { Job, JobDTO, JobSerializer } from "./job_repository";

export interface RecordDTO {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export type Record = GetDomainModel<RecordSerializer>;
export type RecordPayload = GetRequestPayload<RecordSerializer>;

class JobRelationSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.BaseSerializer<R, M> {
  private serializer = new JobSerializer();
  fromDTO = (data: JobDTO | null): Job | null => {
    return data !== null ? this.serializer.fromDTO(data) : null;
  };
  toDTO = (data: number | null): number | null => {
    return data !== null ? data : null;
  };
}

class RecordsAPI extends API<RecordDTO> {
  url = "/api/records";
}

export class RecordSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<RecordDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  title = new serializers.EnumField<string | null>();
  content = new serializers.StringField();
  date = new DateOnlyField();
  job = new JobRelationSerializer();

  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class RecordsApiRepository extends repositories.APIRepository {
  api = new RecordsAPI();
  serializer = new RecordSerializer();
}
