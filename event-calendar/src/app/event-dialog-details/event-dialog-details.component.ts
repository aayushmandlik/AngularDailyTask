import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../interface/events.interface';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-event-dialog-details',
  templateUrl: './event-dialog-details.component.html',
  styleUrls: ['./event-dialog-details.component.css']
})
export class EventDialogDetailsComponent implements OnInit {
  datasource = new MatTableDataSource<Events>()
  displayColumns: string[] = ['title','description','date','time']
  constructor(@Inject(MAT_DIALOG_DATA) public data: Events[]){}
  // datasource = this.data
  // events = this.data
  ngOnInit(): void {
    this.datasource.data = this.data
    console.log(this.datasource.data);

  }
}
