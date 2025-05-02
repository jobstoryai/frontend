import { isServer } from "lib/is_server";

export const PROJECT_NAME = "JobStory";
export const ACCESS_TOKEN_STORAGE_KEY = "__at";
export const PAGE_SIZE = 20;

export const MAX_RECORD_LENGTH = 1000;
export const MAX_USER_ABOUT_LENGTH = 2000;
export const MAX_CV_PROMPT_LENGTH = 10000;

export const BASE_URL = isServer()
  ? `${process.env.SERVER_BACKEND_URL}`
  : `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const JOB_DESCRIPTION_LENGTH_DANGER = 50;
export const JOB_DESCRIPTION_LENGTH_WARNING = 100;
export const JOB_RECORDS_COUNT_DANGER = 3;
export const JOB_RECORDS_COUNT_WARNING = 5;
