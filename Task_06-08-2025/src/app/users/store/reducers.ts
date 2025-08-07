import { createReducer, on } from "@ngrx/store";
import { Users } from "src/app/interface/users.interface";
import * as UsersAction from './actions'
import { State } from "src/app/interface/userState.interface";


export const initialState : State = {
  users: [],
  loading: false,
  error: null
}

export const usersReducer = createReducer(initialState,
  on(UsersAction.loadUsers, (state)=>({...state,loading: true})),
  on(UsersAction.loadUsersSuccess, (state,{users})=>({...state,loading:false,users})),
  on(UsersAction.loadUsersFailure, (state,{error})=>({...state,loading:true,error}))
)
