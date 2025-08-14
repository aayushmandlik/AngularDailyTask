import { createReducer, on } from "@ngrx/store";
import { Users } from "src/app/interface/users.interface";
import * as UsersAction from './actions'
import { State } from "src/app/interface/userState.interface";
import * as ProductsAction from './actions'
import { PState } from "../interface/productState.interface";

export const initialState : State = {
  users: {users: [], total: 0, skip: 0, limit: 0},
  loading: false,
  error: null
}

export const productsInitialState: PState = {
  products: {products:[], total: 0, skip: 0, limit: 0},
  loading: false,
  error: null
}

export const usersReducer = createReducer(initialState,
  on(UsersAction.loadUsers, (state)=>({...state,loading: true})),
  on(UsersAction.loadUsersSuccess, (state,{users})=>({...state,loading:false,users})),
  on(UsersAction.loadUsersFailure, (state,{error})=>({...state,loading:true,error}))
)


export const productsReducer = createReducer(productsInitialState,
  on(ProductsAction.loadProducts, (state)=>({...state,loading: true})),
  on(ProductsAction.loadProductsSuccess, (state,{products})=>({...state,loading: false,products})),
  on(ProductsAction.loadUsersFailure, (state,{error})=>({...state,loading: true, error}))
)
