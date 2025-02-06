import { repositories, serializers } from "client-rest-framework";

import { GetDomainModel, GetRequestPayload } from "types";

import { API } from "./apis/api";

export interface CvDTO {
  id: number;

  title: string;
  prompt: string;
  status: string;

  created_at: string;
  updated_at: string;
}

export type Cv = GetDomainModel<CvSerializer>;
export type CvPayload = GetRequestPayload<CvSerializer>;

class CvsAPI extends API<CvDTO> {
  url = "/api/cvs";
}

export class CvSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<CvDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });

  title = new serializers.EnumField<string>();
  prompt = new serializers.StringField();
  status = new serializers.EnumField<
    "PENDING" | "PROCESSING" | "ACTIVE" | "INACTIVE",
    true,
    false
  >({ readonly: true });

  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class CvsApiRepository extends repositories.APIRepository {
  api = new CvsAPI();
  serializer = new CvSerializer();
}
