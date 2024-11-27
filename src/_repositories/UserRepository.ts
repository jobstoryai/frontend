import { repositories, serializers } from "client-rest-framework";

import { API } from "./apis/Api";
import { RoleKey } from "./types";

export interface PublicUserDTO {
  id: number;
  username: string;
  email: string;
  display_name: string;
  date_joined: string;
  notes: string;
  phone: string;
  roles: RoleKey[];
}

export type PublicUser = ReturnType<PublicUserSerializer["fromDTO"]>

class PublicUserAPI extends API<PublicUserDTO> {
  url = "/api/p/users";
}


export class PublicUserSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<PublicUserDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  username = new serializers.StringField({ readonly: true })
  email = new serializers.StringField({ readonly: true })
  display_name = new serializers.StringField({ readonly: true })
  date_joined = new serializers.DateField({ readonly: true })
  notes = new serializers.StringField()
  phone = new serializers.StringField()
  roles = new serializers.EnumField<RoleKey, false, true>({ many: true })
}


export class PublicUserApiRepository extends repositories.APIRepository {
  api = new PublicUserAPI();
  serializer = new PublicUserSerializer();
}
