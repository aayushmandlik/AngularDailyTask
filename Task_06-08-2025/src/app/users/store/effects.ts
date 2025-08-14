import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { UsersService } from "src/app/users.service";
import * as UsersAction from './actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersResponse } from "src/app/interface/users.interface";

@Injectable()
export class UsersEffect{
  constructor(private action$: Actions, private usersService: UsersService){}

  getUsers$ = createEffect(()=>this.action$.pipe(ofType(UsersAction.loadUsers),mergeMap(()=>{
    return this.usersService.getAllUsers().pipe(map((usersRes: UsersResponse)=>UsersAction.loadUsersSuccess({users: usersRes})),
    catchError((error)=>of(UsersAction.loadUsersFailure({error:error.message})))
  )

  })))

}
