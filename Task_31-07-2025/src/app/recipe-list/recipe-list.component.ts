import { Component, EventEmitter, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] = []
  filter:Recipe[]=[]
  search = ""
  constructor(private recipeService: RecipeService){}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.filter = this.recipes
  }

  addRecipe(newRecipe:any){
    this.recipeService.addRecipe(newRecipe)
  }

  deleteRecipe(id:number){
    this.recipeService.deleteRecipes(id)
    this.recipes = this.recipeService.getRecipes();
    this.filter = this.filter.filter(recipe => recipe.id!==id)
  }

  onSearch(event: any){
    const input = event.target
    this.search = input.value.toLowerCase()
    console.log(this.filter)
    this.filter=this.recipes.filter((item)=>
      item.title.toLowerCase().includes(this.search)
    )
    console.log(this.filter)
  }
}
