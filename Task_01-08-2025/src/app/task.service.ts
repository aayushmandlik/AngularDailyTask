import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Task{
  id?:string
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

  deleteTask(id:string):Observable<Task>{
    return this.http.delete<Task>(`${this.api}/${id}`)
  }
}
