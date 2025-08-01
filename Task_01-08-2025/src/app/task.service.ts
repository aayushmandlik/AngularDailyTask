import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Task{
  id?:number
  title: string,
  description: string,
  assignedby: string,
  duedate: string,
  status: 'Pending' | 'InProgress' | 'Completed'
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = "http://localhost:3000/task"
  constructor(private http: HttpClient) { }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.api)
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.api,task)
  }

  updateTask(task: Task){
    return this.http.put<Task>(`${this.api}/${task.id}`,task)
  }

  updateStatus(id:number, status:Task['status'] ):Observable<Task>{
    return this.http.put<Task>(`${this.api}/${id}`,status)
  }

  deleteTask(id:number):Observable<Task>{
    return this.http.delete<Task>(`${this.api}/${id}`)
  }
}
