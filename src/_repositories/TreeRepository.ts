
import { repositories, serializers } from "client-rest-framework";
import { API } from "./apis/Api";
import { PublicUserDTO, PublicUserSerializer } from "./UserRepository";
import { GetDomainModel, GetRequestPayload } from "./types";


export interface TreeDTO {
  id: number;
  title: string;
  node_type: 'SKILL' | 'CONCEPT' | 'COMPETENCE'
  slug: string;
  children: TreeDTO;
}

export type Tree = GetDomainModel<TreeSerializer>

class TreeApi extends API<PublicUserDTO> {
  url = "/api/tree";
}

export class TreeSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<TreeDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  title = new serializers.StringField();
  slug = new serializers.StringField();

  node_type = new serializers.EnumField<'SKILL' | 'COMPETENCE' | 'CONCEPT'>()
  children = new serializers.EnumField<any>()
}


export class TreeRepository extends repositories.APIRepository {
  api = new TreeApi();
  serializer = new TreeSerializer();
}
