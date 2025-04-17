import { api, pagination } from "client-rest-framework";

import { PAGE_SIZE } from "config";

import { HTTPClient } from "./http_client";

const BASE_URL = `http://localhost:4400`;

export class API<T> extends api.RESTAPI<T> {
  options = {
    appendSlash: true,
  };

  pagination = new pagination.PageNumberPagination<T>({
    pageSize: PAGE_SIZE,
  });

  client = new HTTPClient({
    baseURL: BASE_URL,
  });
}
