import { repositories, serializers } from "client-rest-framework";

import { API } from "./apis/api";

export interface CvVersionDTO {
  id: number;
  is_active: boolean;
  json: string;
  raw_response: string;
}

export type CvVersion = ReturnType<CvVersionSerializer["fromDTO"]>;

class JsonField<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.BaseSerializer<R, M> {
  fromDTO = (data: string) => data as any;
  toDTO = (data: any) => data;
}

class CvVersionAPI extends API<CvVersionDTO> {
  url = "/api/cv-versions";
}

export class CvVersionSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<CvVersionDTO, R, M> {
  id = new serializers.StringField({ readonly: true });
  is_active = new serializers.BooleanField();
  cv = new serializers.NumberField();

  json = new JsonField({ readonly: true });
  raw_response = new JsonField({ readonly: true });

  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class CvVersionApiRepository extends repositories.APIRepository {
  api = new CvVersionAPI();
  serializer = new CvVersionSerializer();
}
