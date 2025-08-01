import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit{
  @ViewChild('titleinput') inputElement!:ElementRef
  taskForm: FormGroup
  tasks: Task[] = []
  dataSource= new MatTableDataSource<Task>()
  displayColumns: string[] = ['title','description','assignedby','duedate','status','actions']
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

  ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus()
  }

  loadTasks(){
    this.taskService.getTasks().subscribe(data=>
      this.dataSource.data = data
    )
  }

  saveTask() {
    const formData = this.taskForm.value
    
    if(this.isEdit){
      const updatedTask: Task = {...this.currentTask,...formData}
      this.taskService.updateTask(updatedTask).subscribe(()=>{
        this.loadTasks();
        this.taskForm.reset();
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

  deleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(()=> this.loadTasks())
  }

}
