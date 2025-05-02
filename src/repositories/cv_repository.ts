import { repositories, serializers } from "client-rest-framework";

import { GetDomainModel, GetRequestPayload } from "types";

import { API } from "./apis/api";

export interface CvDTO {
  id: number;

  position: string;
  company: string;
  job_description: string;
  status: string;
  latest_version: string | null;

  created_at: string;
  updated_at: string;
}

export type Cv = GetDomainModel<CvSerializer>;
export type CvPayload = GetRequestPayload<CvSerializer>;

class CvsAPI extends API<CvDTO> {
  url = "/api/cvs";
}

class CvVersionMinimalSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<
  { updated_at: string; id: string },
  R,
  M
> {
  id = new serializers.StringField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class CvSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<CvDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });

  position = new serializers.StringField();
  company = new serializers.StringField();
  job_description = new serializers.StringField();
  status = new serializers.EnumField<
    "PENDING" | "PROCESSING" | "ACTIVE" | "INACTIVE",
    true,
    false
  >({ readonly: true });

  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
  versions = new CvVersionMinimalSerializer({ readonly: true, many: true });
  latest_version = new serializers.EnumField<string | null, true, false>({
    readonly: true,
  });
}

export class CvsApiRepository extends repositories.APIRepository {
  api = new CvsAPI();
  serializer = new CvSerializer();
}
