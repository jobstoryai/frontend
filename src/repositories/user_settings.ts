import { repositories, serializers } from "client-rest-framework";

import { GetDomainModel, GetRequestPayload } from "types";

import { API } from "./apis/api";

export interface UserSettingsDTO {
  id: number;
  user: number;
  user_prompt: string;
  created_at: string;
  updated_at: string;
}

export type UserSettings = GetDomainModel<UserSettingsSerializer>;
export type UserSettingsPayload = GetRequestPayload<UserSettingsSerializer>;

class UserSettingsAPI extends API<UserSettingsDTO> {
  url = "/api/settings";
}

export class UserSettingsSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<UserSettingsDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  user_prompt = new serializers.StringField();
  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class UserSettingsApiRepository extends repositories.APIRepository {
  api = new UserSettingsAPI();
  serializer = new UserSettingsSerializer();
}
