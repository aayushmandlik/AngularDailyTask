import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent {
  @Input() data: any[] = []
  @Input() columns: {columnDef: string, header: string, cell: (row:any)=> string}[] = []

  displayedColumns():string[]{
    return this.columns.map((c)=>c.columnDef)
  }
}
