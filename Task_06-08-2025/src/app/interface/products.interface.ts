export interface Products{
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  availabilityStatus:string
}

export interface ProductsResponse{
  products: Products[]
  total: number;
  skip: number;
  limit: number
}
