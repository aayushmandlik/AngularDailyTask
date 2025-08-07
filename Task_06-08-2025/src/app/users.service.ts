import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Users } from './interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>('https://dummyjson.com/users').pipe(delay(3000))
  }
}
