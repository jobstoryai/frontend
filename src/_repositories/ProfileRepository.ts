import { repositories, serializers } from "client-rest-framework";
import { GetDomainModel, GetRequestPayload } from "./types";

import { API } from "./apis/Api";
import { NodeMinimalSerializer } from "./NodeRepository";
import { format } from "date-fns";

interface WorkExperience {
  title: string;
  description: string;
  start: string;
  finish: string;
}

interface Knowledge {
  value: number;
  node: any;
}

export interface ProfileDTO {
  id: number;
  user: string;
  work_experience: WorkExperience[];
  knowledge: Knowledge[];
}

export type Profile = GetDomainModel<ProfileSerializer>;
export type ProfilePayload = GetRequestPayload<ProfileSerializer>;

class ProfileAPI extends API<ProfileDTO> {
  url = "/api/profile";
}

export class DateField<
  R extends boolean = false,
  M extends boolean = false
> extends serializers.BaseSerializer<R, M> {
  static DATE_FORMAT_DATA_FNS = "yyyy-MM-dd";
  public fromDTO = (data: string) => new Date(data);
  public toDTO = (i: Date) => format(new Date(i), DateField.DATE_FORMAT_DATA_FNS);
}

class WorkExperienceSerializer<
  R extends boolean = false,
  M extends boolean = false
> extends serializers.ModelSerializer<any, R, M> {
  id = new serializers.NumberField({ readonly: true });
  job_title = new serializers.StringField();
  description = new serializers.StringField();
  company = new serializers.StringField();
  started = new DateField();
  finished = new DateField();

  primary_skills = new NodeMinimalSerializer({ many: true });
  secondary_skills = new NodeMinimalSerializer({ many: true });
}

class KnowledgeSerializer<
  R extends boolean = false,
  M extends boolean = false
> extends serializers.ModelSerializer<any, R, M> {
  id = new serializers.NumberField()
  title = new serializers.StringField();
  node_type = new serializers.StringField();
  slug = new serializers.StringField();
  value = new serializers.StringField();

  // @ts-ignore
  toDTO = (
    { id, profiency_level }: { id: number, profiency_level: number }) => ({
    id: Number(id), profiency_level,
  })
}

export class ProfileSerializer<
  R extends boolean = false,
  M extends boolean = false
> extends serializers.ModelSerializer<ProfileAPI, R, M> {
  id = new serializers.NumberField({ readonly: true });
  user = new serializers.StringField({ readonly: true });
  first_name = new serializers.StringField();
  last_name = new serializers.StringField();

  job_title = new serializers.StringField();
  about = new serializers.StringField();

  work_experience = new WorkExperienceSerializer({ many: true });
  knowledge = new KnowledgeSerializer({ many: true });
}

export class ProfileRepository extends repositories.APIRepository {
  api = new ProfileAPI();
  serializer = new ProfileSerializer();
}
