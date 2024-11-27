import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://localhost:8100",
  realm: "jobstory",
  clientId: "jobstory-frontend",
});
