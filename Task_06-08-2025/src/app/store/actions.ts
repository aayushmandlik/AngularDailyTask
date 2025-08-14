import { createAction, props } from "@ngrx/store";
import { Users, UsersResponse } from "src/app/interface/users.interface";
import { ProductsResponse } from "../interface/products.interface";

export const loadUsers = createAction('[Users] Load Users')
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{users: UsersResponse}>())
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{error: string}>())

export const loadProducts = createAction('[Products] Load Products')
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{products: ProductsResponse}>())
export const loadProductsFailure = createAction('[Products] Load Products Failure',props<{error: string}>())
