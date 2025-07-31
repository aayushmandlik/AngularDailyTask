import { Injectable } from '@angular/core';

export interface Recipe{
  id: number
  title: string;
  category: string;
  instruction: string;
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {'id':1,'title':'Fried Rice','category':'Chinese','instruction':'Add Oil,Spring Onions,Rice,Red sauce,salt','image':'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'id':2,'title':'Pasta','category':'Italian','instruction':'Add Butter, Vegies, Pasta, Red Sauce, Chilli flex','image':'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg'},
    {'id':3,'title':'Frankie','category':'Indian','instruction':'Make Roti, Apply mayonaise and sauce and add potato stuffing and roll','image':'https://t3.ftcdn.net/jpg/08/70/38/20/360_F_870382038_CAxr80zF4wQbuSsRoPNMid4rK3MNwh2w.jpg'}
  ]
  constructor() { }
  private nextId = 4;

  addRecipe(recipe: Recipe){
    recipe.id = this.nextId++;
    this.recipes.push(recipe)
  }

  getRecipes(): Recipe[] {
    return this.recipes
  }

  updateRecipes(recipe:Recipe){
    const index = this.recipes.findIndex((r) => r.id==recipe.id)
    if(index!==-1){
      this.recipes[index] = recipe
    }
  }

  deleteRecipes(id:number){
    this.recipes = this.recipes.filter(r => r.id!==id)
  }

}
