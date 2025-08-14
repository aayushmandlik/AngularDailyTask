import { ProductsResponse } from "./products.interface";

export interface PState{
  products: ProductsResponse
  loading: boolean
  error: string | null
}
