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

export type PublicUser = ReturnType<UserSerializer["fromDTO"]>;
export type PublicUserPayload = Partial<ReturnType<UserSerializer["toDTO"]>>;

class UserAPI extends API<UserDTO> {
  url = "/api/users";
}

export class UserSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<UserDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  username = new serializers.StringField({ readonly: true });
  email = new serializers.StringField({ readonly: true });
  date_joined = new serializers.DateField({ readonly: true });
  first_name = new serializers.StringField();
  last_name = new serializers.StringField();
  about = new serializers.StringField();
}

export class UserApiRepository extends repositories.APIRepository {
  api = new UserAPI();
  serializer = new UserSerializer();
}
