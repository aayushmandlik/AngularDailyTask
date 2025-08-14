import { ProductsService } from './../products.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { UsersService } from "src/app/users.service";
import * as UsersAction from './actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersResponse } from "src/app/interface/users.interface";
import * as ProductsAction from './actions'
import { ProductsResponse } from '../interface/products.interface';
@Injectable()
export class UsersEffect{
  constructor(private action$: Actions, private usersService: UsersService, private productsService: ProductsService){}

  getUsers$ = createEffect(()=>this.action$.pipe(ofType(UsersAction.loadUsers),mergeMap(()=>{
    return this.usersService.getAllUsers().pipe(map((usersRes: UsersResponse)=>UsersAction.loadUsersSuccess({users: usersRes})),
    catchError((error)=>of(UsersAction.loadUsersFailure({error:error.message})))
  )

  })))

  getProducts$ = createEffect(()=>this.action$.pipe(ofType(ProductsAction.loadProducts),mergeMap(()=>{
    return this.productsService.getAllProducts().pipe(map((prodsRes: ProductsResponse)=>ProductsAction.loadProductsSuccess({products: prodsRes})),
    catchError((error)=>of(UsersAction.loadProductsFailure({error:error.message})))
  )
  })))

}
