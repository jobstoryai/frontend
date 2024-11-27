import { pagination, repositories, serializers } from "client-rest-framework";
import { API } from "./apis/Api";
import { PublicUserDTO, PublicUserSerializer } from "./UserRepository";
import { GetDomainModel, GetRequestPayload } from "./types";
import { NodeTagSerializer } from "./NodeTagsRepository";


export interface NodeDTO {
  id: number;
  title: string;
  node_type: 'SKILL' | 'CONCEPT' | 'COMPETENCE'
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
  created_by: PublicUserDTO;
}

export interface NodeMinimalDTO {
  id: number;
  title: string;
  node_type: string;
  slug: string;
}


export interface RelationDTO {
  id: number;
  relation_type: 'PARENT_OF' | 'ALTERNATIVE_OF' | 'ANY_OF' | 'ALL_OF',

  created_at: string;
  updated_at: string;
  created_by: PublicUserDTO;

  node: NodeMinimalDTO;
}

export type Node = GetDomainModel<NodeSerializer>
export type NodePayload = GetRequestPayload<NodeSerializer>;

export type Relation = GetDomainModel<RelationSerializer>
export type RelationPayload = GetRequestPayload<RelationSerializer>;

class NodeApi extends API<NodeDTO> {
  pagination = new pagination.PageNumberPagination<NodeDTO>()
  url = "/api/nodes";
}

class RelationSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<RelationDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  relation_type = new serializers.EnumField<RelationDTO['relation_type']>()

  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
  created_by = new PublicUserSerializer({ readonly: true })

  node = new NodeMinimalSerializer()
}

class ProficiencyLevelSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<any, R, M> {
  value = new serializers.NumberField()
  title = new serializers.StringField()
}

export class NodeMinimalSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<any, R, M> {
    id = new serializers.NumberField()
    title = new serializers.StringField()
    node_type = new serializers.StringField()
    slug = new serializers.StringField()

    // @ts-ignore
    toDTO = (id: number) => id
}

class FKNodeTagSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends NodeTagSerializer<R, M> {
  // @ts-ignore
  toDTO = (data: any) => Number(data);
}



export class NodeSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<NodeDTO, R, M> {
  id = new serializers.NumberField({ readonly: true })
  title = new serializers.StringField();
  content = new serializers.StringField();
  slug = new serializers.StringField();

  node_type = new serializers.EnumField<'SKILL' | 'COMPETENCE' | 'CONCEPT'>()
  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
  created_by = new PublicUserSerializer({ readonly: true })

  relations = new RelationSerializer({ many: true })
  proficiency_levels = new ProficiencyLevelSerializer({ many: true })
  tags = new FKNodeTagSerializer({ many: true })
}


export class NodeRepository extends repositories.APIRepository {
  api = new NodeApi();
  serializer = new NodeSerializer();
}
