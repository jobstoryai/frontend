import { isServer } from "lib/isServer";

export const PROJECT_NAME = "JobStory";
export const ACCESS_TOKEN_STORAGE_KEY = "__at";
//export const ACCESS_TOKEN_COOKIE_NAME = "__CH_AT__";
//export const REFRESH_TOKEN_COOKIE_NAME = "__CH_RT__";
export const PAGE_SIZE = 20;

export const BASE_URL = isServer()
  ? `${process.env.SERVER_BACKEND_URL}`
  : `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

// TODO: Implement 2-directional relations
//       For example `parent of` if the issue in the left side,
//       and `child of` if in the right side
//
// interface RelationItemConfig {
//   key: string
//   as_owner: {
//     relation_name: string
//   },
//   as_linked: {
//     relation_name: string
//   }
// }

export const NODE_RELATIONS = {
  PARENT_OF: "Parent of",
  ALTERNATIVE_OF: "Alternative of",
  ANY_OF: "Any of",
  ALL_OF: "All of",

  // Virtual:
  CHILD_OF: "Child of",
};

export const NODE_TYPES = {
  SKILL: "Skill",
  COMPETENCE: "Competence",
  CONCEPT: "Concept",
};
