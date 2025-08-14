import { Products } from '../interface/products.interface'
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppStateInterface, AppStateProductInterface } from '../type/appState.interface';
import { selectedProducts, selectedProductsFailure, selectedProductsLoading } from '../store/selector';
import { ProductsResponse } from '../interface/products.interface';
import * as ProductsAction from '../store/actions'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products$: Observable<Products[]>
  loading$: Observable<boolean>
  error$: Observable<string | null>

  productsColumns = [
    {columnDef: 'title', header: 'Id' , cell: (row: any)=> row.title},
    {columnDef: 'category', header: 'First Name', cell: (row: any)=> row.category},
    {columnDef: 'price', header: 'Last Name', cell: (row: any)=> row.price},
    {columnDef: 'discountPercentage', header: 'Maiden Name', cell: (row: any)=> row.discountPercentage},
    {columnDef: 'rating', header: 'Age', cell: (row: any)=> row.rating},
    {columnDef: 'stock', header: 'Email', cell: (row: any)=> row.stock},
    {columnDef: 'brand', header: 'Phone', cell: (row: any)=> row.brand},
    {columnDef: 'availabilityStatus', header: 'Gender', cell: (row: any)=> row.availabilityStatus}
  ]

  constructor(private store: Store<AppStateProductInterface>) {
    this.products$ = this.store.pipe(select(selectedProducts),map((response: ProductsResponse)=>response.products))
    this.loading$ = this.store.pipe(select(selectedProductsLoading))
    this.error$ = this.store.pipe(select(selectedProductsFailure))
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsAction.loadProducts())
    this.products$.subscribe((products)=>console.log(products))
  }
}
