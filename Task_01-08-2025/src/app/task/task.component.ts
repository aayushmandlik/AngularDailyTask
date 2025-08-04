import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit{
  @ViewChild('titleinput') inputElement!:ElementRef
  @ViewChild(TaskListComponent) taskListComp!:TaskListComponent;
  taskForm: FormGroup
  tasks: Task[] = []
  // dataSource= new MatTableDataSource<Task>()
  // displayColumns: string[] = ['title','description','assignedby','duedate','status','actions']
  currentTask: Task = {
    title: '',
    description: '',
    assignedby: '',
    duedate: '',
    status: 'Pending'
  }
  isEdit = false;


  constructor(private taskService: TaskService, private fb: FormBuilder ){
    this.taskForm = this.fb.group({
      title:['',Validators.required],
      description:[''],
      assignedby: [''],
      duedate: [''],
      status: ['']
    })
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getTasks().subscribe((data)=>{
      this.tasks = data
    //   if (this.taskListComp) {
    //   this.taskListComp.data = data;
    //   this.taskListComp.dataSource.data = data;
    //   this.taskListComp.PendingDataSource.data = data.filter(t => t.status === 'Pending');
    //   this.taskListComp.InProgressDataSource.data = data.filter(t => t.status === 'InProgress');
    //   this.taskListComp.CompletedDataSource.data = data.filter(t => t.status === 'Completed');
    // }
    })
    
  }

  ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus()
    this.taskListComp.updatefunc = (task:Task) => this.editTask(task)
    this.taskListComp.onDelete = (id: string) => this.deleteTask(id)
  }

  saveTask() {
    const formData = this.taskForm.value
    
    if(this.isEdit){
      const updatedTask: Task = {...this.currentTask,...formData}
      this.taskService.updateTask(updatedTask).subscribe(()=>{
        this.loadTasks();
        this.taskForm.reset();
        this.isEdit = false
      })
    }
    else {
      const addTask: Task = {...formData}
      this.taskService.addTask(addTask).subscribe(()=>{
        this.loadTasks();
        console.log(addTask)
        this.taskForm.reset();
      })
    }
  }

  editTask(task: Task){
    this.currentTask = {...task}
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      assignedby: task.assignedby,
      duedate: task.duedate,
      status: task.status
    })
    this.isEdit = true
  }

  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe(()=> this.loadTasks())
  }

  // deletefunc = (id:string) => this.deleteTask(id);
  updatefunc = (task:Task) => this.editTask(task)

}
