import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employeesData: any[]=[]

  employeeColumns = [
    {columnDef: 'id', header: 'ID' , cell: (row: any)=> row.id},
    {columnDef: 'name', header: 'NAME', cell: (row: any)=> row.name},
    {columnDef: 'designation', header: 'DESIGNATION', cell: (row: any)=> row.designation},
    {columnDef: 'email', header: 'EMAIL', cell: (row: any)=> row.email},
    {columnDef: 'phone', header: 'PHONE', cell: (row: any)=> row.phone},
    {columnDef: 'gender', header: 'GENDER', cell: (row: any)=> row.gender}
  ]
}
