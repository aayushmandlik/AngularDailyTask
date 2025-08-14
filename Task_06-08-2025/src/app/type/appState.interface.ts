import { PState } from "../interface/productState.interface";
import { State } from "../interface/userState.interface";


export interface AppStateInterface{
  users: State
}

export interface AppStateProductInterface{
  products: PState
}
