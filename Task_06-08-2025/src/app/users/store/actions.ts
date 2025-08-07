import { createAction, props } from "@ngrx/store";
import { Users } from "src/app/interface/users.interface";

export const loadUsers = createAction('[Users] Load Users')
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{users: Users[]}>())
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{error: string}>())
