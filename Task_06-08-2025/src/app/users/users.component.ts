import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Users, UsersResponse } from '../interface/users.interface';
import { selectedUsers, selectedUsersFailure, selectedUsersLoading } from '../store/selector';
import * as UsersAction from '../store/actions'
import { AppStateInterface } from '../type/appState.interface';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users$: Observable<Users[]>
  loading$: Observable<boolean>
  error$: Observable<string | null>

  usersColumns = [
    {columnDef: 'id', header: 'Id' , cell: (row: any)=> row.id},
    {columnDef: 'firstName', header: 'First Name', cell: (row: any)=> row.firstName},
    {columnDef: 'lastName', header: 'Last Name', cell: (row: any)=> row.lastName},
    {columnDef: 'maidenName', header: 'Maiden Name', cell: (row: any)=> row.maidenName},
    {columnDef: 'age', header: 'Age', cell: (row: any)=> row.age},
    {columnDef: 'email', header: 'Email', cell: (row: any)=> row.email},
    {columnDef: 'phone', header: 'Phone', cell: (row: any)=> row.phone},
    {columnDef: 'gender', header: 'Gender', cell: (row: any)=> row.gender}
  ]

  constructor(private store: Store<AppStateInterface>){
    this.users$ = this.store.pipe(select(selectedUsers),map((response: UsersResponse) => response.users ))
    this.loading$ = this.store.pipe(select(selectedUsersLoading))
    this.error$ = this.store.pipe(select(selectedUsersFailure))
  }

  ngOnInit(): void {
    this.store.dispatch(UsersAction.loadUsers())
    this.users$.subscribe((user)=>console.log('users data',user))
  }

}
