import { api, pagination } from "client-rest-framework";

import { isServer } from "lib/isServer";

import { PAGE_SIZE } from "config";

import { HTTPClient } from "./HttpClient";

const BASE_URL = isServer()
  ? `${process.env.SERVER_BACKEND_URL}`
  : `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export class API<T> extends api.RESTAPI<T> {
  options = {
    appendSlash: true,
  }

  pagination = new pagination.PageNumberPagination<T>({
    pageSize: PAGE_SIZE,
  });

  client = new HTTPClient({
    baseURL: BASE_URL,
  });
}

