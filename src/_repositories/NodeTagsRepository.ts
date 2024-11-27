import { pagination, repositories, serializers } from "client-rest-framework";
import { API } from "./apis/Api";
import { PublicUserDTO, PublicUserSerializer } from "./UserRepository";
import { GetDomainModel, GetRequestPayload } from "./types";

export interface NodeTagDTO {
  title: string;
  created_at: string;
  updated_at: string;
  created_by: PublicUserDTO;
}

export type NodeTag = GetDomainModel<NodeTagSerializer>;
export type NodeTagPayload = GetRequestPayload<NodeTagSerializer>;

class NodeTagApi extends API<NodeTagDTO> {
  pagination = new pagination.PageNumberPagination<NodeTagDTO>();
  url = "/api/tags";
}

export class NodeTagSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<NodeTagDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  title = new serializers.StringField();
  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
  created_by = new PublicUserSerializer({ readonly: true });
}

export class NodeTagRepository extends repositories.APIRepository {
  api = new NodeTagApi();
  serializer = new NodeTagSerializer();
}
