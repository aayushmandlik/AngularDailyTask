import { Users } from "./users.interface";

export interface State {
  users: Users[],
  loading: boolean,
  error: string | null
}
