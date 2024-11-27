import jwtDecode from "jwt-decode";
import { setCookie } from "nookies";

export const setCookieToken = (name: string, token: string) => {
  const decoded: { exp: number } = jwtDecode(token);
  const expiredAt = decoded.exp * 1_000;
  const expires = new Date(expiredAt);

  setCookie(null, name, token, {
    expires,
  });
};
