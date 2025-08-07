import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from '../mat-table/mat-table.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [MatTableComponent],
  imports: [
    CommonModule,MatTableModule
  ],
  exports: [MatTableComponent,MatTableModule]

})
export class SharedModule { }
