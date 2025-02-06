import { serializers } from "client-rest-framework";
import { format } from "date-fns";

export class DateOnlyField<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.BaseSerializer<R, M> {
  fromDTO = (data: string) => new Date(data);
  toDTO = (data: Date) => format(new Date(data), "yyyy-MM-dd");
}
