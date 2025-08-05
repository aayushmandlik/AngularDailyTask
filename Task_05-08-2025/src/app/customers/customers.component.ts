import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  @Input() customersData: any[] = []

  customerColumns = [
    {columnDef:'id', header: 'ID', cell: (row:any)=>row.id},
    {columnDef: 'name', header: 'NAME', cell: (row:any)=>row.name},
    {columnDef: 'email', header: 'EMAIL', cell: (row:any)=>row.email},
    {columnDef: 'phone', header: 'PHONE', cell: (row:any)=>row.phone},
    {columnDef: 'gender', header: 'GENDER', cell: (row:any)=>row.gender},
    {columnDef: 'age', header: 'AGE', cell: (row:any)=>row.age},
  ]
}
