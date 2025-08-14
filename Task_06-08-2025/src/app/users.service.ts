import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Users, UsersResponse } from './interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UsersResponse>{
    return this.http.get<UsersResponse>('https://dummyjson.com/users').pipe(delay(3000))
  }
}
