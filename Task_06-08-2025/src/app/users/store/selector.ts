import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "src/app/interface/userState.interface";

export const seletedUserState = createFeatureSelector<State>('users')

export const selectedUsers = createSelector(seletedUserState,state=>state.users);
export const selectedUsersLoading = createSelector(seletedUserState,state=>state.loading)
export const selectedUsersFailure = createSelector(seletedUserState,state=>state.error)
