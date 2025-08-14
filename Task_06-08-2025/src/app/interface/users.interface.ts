export interface Users{
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age:number;
    gender:string;
    email: string;
    phone: string;

}

export interface UsersResponse{
  users: Users[]
  total: number
  skip: number
  limit: number
}
