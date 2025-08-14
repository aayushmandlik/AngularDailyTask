import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ProductsResponse } from './interface/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

    getAllProducts(): Observable<ProductsResponse>{
      return this.http.get<ProductsResponse>('https://dummyjson.com/products').pipe(delay(3000))
    }
}
