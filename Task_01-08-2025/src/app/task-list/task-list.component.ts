import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges,AfterViewInit {

  search: string=''
  sortdata: string = ''

  @Input() data: Task[] = []
  updatefunc!: (task:Task) => void
  deletefunc!: (id: string) => void;

  @ViewChildren('taskRow') taskRows!: QueryList<ElementRef>;

  assigneeFilter: string = ''
  dataSource = new MatTableDataSource<Task>()
  PendingDataSource = new MatTableDataSource<Task>()
  InProgressDataSource = new MatTableDataSource<Task>()
  CompletedDataSource = new MatTableDataSource<Task>()
  filterDataSource = new MatTableDataSource<Task>()

  @ViewChild('paginator') paginator!: MatPaginator
  @ViewChild('ppaginator') ppaginator!: MatPaginator
  @ViewChild('ipaginator') ipaginator!: MatPaginator
  @ViewChild('cpaginator') cpaginator!: MatPaginator
  displayColumns: string[] = ['title','description','assignedby','duedate','status','actions']

  constructor(private taskService: TaskService){}

  // ngOnInit(): void {
  //   this.sortByTitle()
  // }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['data']){
        // this.sortByTitle()
        this.dataSource.data = this.data
        this.filterDataSource.data = this.dataSource.data
        this.PendingDataSource.data = this.data.filter(t => t.status === 'Pending')
        this.InProgressDataSource.data = this.data.filter(t => t.status === 'InProgress')
        this.CompletedDataSource.data = this.data.filter(t => t.status === 'Completed')
      }
      console.log(changes)
  }


  highlightByAssignee(assignee: string): void{
    this.assigneeFilter = assignee
  }

  // sortByTitle(){

  //   this.filterDataSource.data = [...this.filterDataSource.data].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  //   this.PendingDataSource.data = [...this.PendingDataSource.data].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  //   this.InProgressDataSource.data = [...this.InProgressDataSource.data].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  //   this.CompletedDataSource.data = [...this.CompletedDataSource.data].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  //   console.log(this.dataSource.data)
  // }

  onSortChange(event: Event){
    this.sortdata = (event.target as HTMLSelectElement).value
    this.applySort()
  }

  applySort(){
    if(this.sortdata == "title"){
      this.sortbyName();
    }
    else if(this.sortdata == "assignee"){
      this.sortbyAssignee();
    }
  }

  sortbyName(){
    this.filterDataSource.data = [...this.filterDataSource.data].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  }
  sortbyAssignee(){
    this.filterDataSource.data = [...this.filterDataSource.data].sort((a,b)=> a.assignedby.toLowerCase().localeCompare(b.assignedby.toLowerCase()))
  }

  ngAfterViewInit(): void {
    this.filterDataSource.paginator = this.paginator
    this.PendingDataSource.paginator = this.ppaginator
    this.InProgressDataSource.paginator = this.ipaginator
    this.CompletedDataSource.paginator = this.cpaginator
  }

  onSearchTitle(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    this.filterDataSource.data = this.dataSource.data.filter((d)=>
      d.title.toLowerCase().includes(this.search)
    )
  }

  onSearchDescription(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    this.filterDataSource.data = this.dataSource.data.filter((d)=>
      d.description.toLowerCase().includes(this.search)
    )
  }

  onSearchAssignee(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    this.filterDataSource.data = this.dataSource.data.filter((d)=>
      d.assignedby.toLowerCase().includes(this.search)
    )
  }

  onSearchDuedate(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    this.filterDataSource.data = this.dataSource.data.filter((d)=>
      d.duedate.toLowerCase().includes(this.search)
    )
  }

  onSearchStatus(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    this.filterDataSource.data = this.dataSource.data.filter((d)=>
      d.status.toLowerCase().includes(this.search)
    )
  }


}
