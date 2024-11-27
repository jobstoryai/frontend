import { api, pagination } from "client-rest-framework";

import { isServer } from "lib/isServer";
import { PartialBy } from "lib/typeUtils";

import { HTTPClient } from "./HttpClient";

interface Tokens {
  access: string;
  refresh: string;
}

interface Credentials {
  username: string;
  password: string;
}

type GetTokensRequestParams = Credentials;
type GetTokensResponse = Tokens;

type RefreshAccessTokenRequestParams = PartialBy<Tokens, "access">;
type RefreshAccessTokenResponse = Omit<Tokens, "refresh">;

export interface MeDTO {
  id: number;
  username: string;
  email: string;
}

export type GetMeResponse = MeDTO;

const BASE_URL = isServer()
  ? `${process.env.SERVER_BACKEND_URL}`
  : `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export class AuthApi extends api.BaseAPI {
  pagination = new pagination.NoPagination();
  client = new HTTPClient({
    baseURL: BASE_URL,
  });

  getMe = async () => {
    const res = await this.client.get<GetMeResponse>("/api/auth/users/me/");
    return res.data;
  };

  getTokens = async (params: GetTokensRequestParams) => {
    const res = await this.client.post<GetTokensResponse>(
      "/api/auth/jwt/create/",
      params
    );
    return res.data;
  };

  refreshAccessToken = async (params: RefreshAccessTokenRequestParams) => {
    const res = await this.client.post<RefreshAccessTokenResponse>(
      "/api/auth/jwt/refresh",
      params
    );
    return res.data;
  };
}

