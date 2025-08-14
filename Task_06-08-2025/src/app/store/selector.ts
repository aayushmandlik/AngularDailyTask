import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "src/app/interface/userState.interface";
import { PState } from "../interface/productState.interface";

export const seletedUserState = createFeatureSelector<State>('users')
export const selectedProductsState = createFeatureSelector<PState>('products')

export const selectedUsers = createSelector(seletedUserState,state=>state.users);
export const selectedUsersLoading = createSelector(seletedUserState,state=>state.loading)
export const selectedUsersFailure = createSelector(seletedUserState,state=>state.error)

export const selectedProducts = createSelector(selectedProductsState,state=>state.products)
export const selectedProductsLoading = createSelector(selectedProductsState,state=> state.loading)
export const selectedProductsFailure = createSelector(selectedProductsState, state => state.error)
