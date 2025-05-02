import { repositories, serializers } from "client-rest-framework";

import { GetDomainModel } from "types";

import { API } from "./apis/api";

export interface OnboardingDTO {
  records: number;
  cvs: number;
  jobs: number;
  cv_versions: number;
}

export type Onboarding = GetDomainModel<OnboardingSerializer>;

class OnboardingAPI extends API<OnboardingDTO> {
  url = "/api/onboarding";
}

export class OnboardingSerializer<
  R extends boolean = false,
  M extends boolean = false,
> extends serializers.ModelSerializer<OnboardingDTO, R, M> {
  records = new serializers.NumberField({ readonly: true });
  jobs = new serializers.NumberField({ readonly: true });
  cvs = new serializers.NumberField({ readonly: true });
  cv_versions = new serializers.NumberField({ readonly: true });
}

export class OnboardingApiRepository extends repositories.APIRepository {
  api = new OnboardingAPI();
  serializer = new OnboardingSerializer();
}
