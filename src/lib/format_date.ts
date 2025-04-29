import { format } from "date-fns";

export const formatDateYYYYMMDD = (date: Date) => format(date, "yyyy-MM-dd");
export const formatDateYYYYMM = (date: Date) => format(date, "yyyy-MM");
