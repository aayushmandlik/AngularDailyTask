import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interface/users.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit{
  @Input() data!: Observable<Users[]>
  dataSource = new MatTableDataSource<Users>()
  @Input() columns: {columnDef: string, header: string, cell: (row:any)=> string}[] = []

  ngOnInit(): void {
    this.data.subscribe((d)=>{
      console.log('Data',d)
      this.dataSource.data = d
      console.log(this.dataSource.data)
    })

  }

  displayedColumns():string[]{
    return this.columns.map((c)=>c.columnDef)
  }
}
