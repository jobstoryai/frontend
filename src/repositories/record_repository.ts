import { repositories, serializers } from "client-rest-framework";
import { API } from "./apis/api";
import { GetDomainModel, GetRequestPayload } from "_repositories/types";
import { format } from "date-fns";

export interface RecordDTO {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export type Record = GetDomainModel<RecordSerializer>;
export type RecordPayload = GetRequestPayload<RecordSerializer>;

export class DateOnlyField<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.BaseSerializer<R, M> {
  fromDTO = (data: string) => new Date(data);
  toDTO = (data: Date) => format(new Date(data), "yyyy-MM-dd");
}

class RecordsAPI extends API<RecordDTO> {
  url = "/api/records";
}

export class RecordSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<RecordDTO, R, M> {
  id = new serializers.NumberField({ readonly: true });
  title = new serializers.EnumField<string | null>();
  content = new serializers.StringField();
  date = new DateOnlyField();
  created_at = new serializers.DateField({ readonly: true });
  updated_at = new serializers.DateField({ readonly: true });
}

export class RecordsApiRepository extends repositories.APIRepository {
  api = new RecordsAPI();
  serializer = new RecordSerializer();
}
