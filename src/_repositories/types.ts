export type RoleKey = "ADMIN" | "EXPERT";

interface ISerializer {
  fromDTO: (...args: any[]) => any;
  toDTO: (...args: any[]) => any;
}

export type GetDomainModel<S extends ISerializer> = ReturnType<S["fromDTO"]>
export type GetRequestPayload<S extends ISerializer> = Parameters<S["toDTO"]>[0]

