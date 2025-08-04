import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges {

  @Input() data: Task[] = []
  updatefunc!: (task:Task) => void
  onDelete!: (id: string) => void;

  @ViewChildren('taskRow') taskRows!: QueryList<ElementRef>;
  
  assigneeFilter: string = ''
  dataSource = new MatTableDataSource<Task>()
  PendingDataSource = new MatTableDataSource<Task>()
  InProgressDataSource = new MatTableDataSource<Task>()
  CompletedDataSource = new MatTableDataSource<Task>()
  displayColumns: string[] = ['title','description','assignedby','duedate','status','actions']

  constructor(private taskService: TaskService){}

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['data']){
        this.dataSource.data = this.data
        this.PendingDataSource.data = this.data.filter(t => t.status === 'Pending')
        this.InProgressDataSource.data = this.data.filter(t => t.status === 'InProgress')
        this.CompletedDataSource.data = this.data.filter(t => t.status === 'Completed')
      }
      console.log(changes)
  }


  highlightByAssignee(assignee: string): void{
    this.assigneeFilter = assignee
  }

  triggerDelete(id: string) {
    if (this.onDelete) this.onDelete(id);
  }
  
}
