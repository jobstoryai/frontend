import React from "react";
import { MeDTO } from "repositories/apis/authApi";


interface Props {
  me: MeDTO | null
}

export const WhoamiView = ({ me }: Props) => (
  <>
    {
      me
        ? <pre>{JSON.stringify(me)}</pre>
        : <div>No user</div>
      }
  </>

)
