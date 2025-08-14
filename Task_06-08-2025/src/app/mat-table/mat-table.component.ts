import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interface/users.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from '../interface/products.interface';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit{
  @Input() data!: Observable<Users[]>
  @Input() productsData!: Observable<Products[]>
  dataSource = new MatTableDataSource<Users>()
  productsDataSource = new MatTableDataSource<Products>()
  @Input() columns: {columnDef: string, header: string, cell: (row:any)=> string}[] = []

  ngOnInit(): void {
    this.data.subscribe((d)=>{
      console.log('Data',d)
      this.dataSource.data = d
      console.log(this.dataSource.data)
    })

    this.productsData.subscribe((data)=>{
      console.log('Data',data)
      this.productsDataSource.data = data
      console.log(this.productsDataSource.data);

    })

  }

  displayedColumns():string[]{
    return this.columns.map((c)=>c.columnDef)
  }
}
