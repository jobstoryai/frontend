import { repositories, serializers } from "client-rest-framework";

import { API } from "./apis/api";

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  phone: string | null;
}

export type PublicUser = ReturnType<PublicUserSerializer["fromDTO"]>;

class UserAPI extends API<UserDTO> {
  url = "/api/users";
}

export class PublicUserSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<UserDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  username = new serializers.StringField({ readonly: true });
  email = new serializers.StringField({ readonly: true });
  date_joined = new serializers.DateField({ readonly: true });
  phone = new serializers.EnumField<string | null>();
}

export class UserApiRepository extends repositories.APIRepository {
  api = new UserAPI();
  serializer = new PublicUserSerializer();
}
