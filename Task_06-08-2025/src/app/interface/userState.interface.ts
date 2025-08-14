import { Users, UsersResponse } from "./users.interface";

export interface State {
  users: UsersResponse,
  loading: boolean,
  error: string | null
}
