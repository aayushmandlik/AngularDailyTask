import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from './interface/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private api = 'http://localhost:3000/events'
  constructor(private http: HttpClient) { }

  getAllEvents():Observable<Events[]>{
    return this.http.get<Events[]>(this.api)
  }

  addEvent(event: Events):Observable<Events>{
    return this.http.post<Events>(this.api,event)
  }
}
