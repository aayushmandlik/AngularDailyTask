import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { UsersService } from "src/app/users.service";
import * as UsersAction from './actions'
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UsersEffect{
  constructor(private action$: Actions, private usersService: UsersService){}

  getUsers$ = createEffect(()=>this.action$.pipe(ofType(UsersAction.loadUsers),mergeMap(()=>{
    return this.usersService.getAllUsers().pipe(map((users)=>UsersAction.loadUsersSuccess({users})),
    catchError((error)=>of(UsersAction.loadUsersFailure({error:error.message})))
  )

  })))

}
