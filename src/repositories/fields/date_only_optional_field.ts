
import { serializers } from "client-rest-framework";
import { format } from "date-fns";

export class DateOnlyOptionalField<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.BaseSerializer<R, M> {
  fromDTO = (data: string | null) => data ? new Date(data) : null;
  toDTO = (data: Date | null) => data ? format(new Date(data), "yyyy-MM-dd") : null;
}
