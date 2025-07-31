import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  title="";
  category="";
  image="";
  instruction=""
  @Output() recipeAdded = new EventEmitter<Recipe>();
 
  onSubmit(){
    if(this.title && this.category && this.instruction){
      const newRecipe : Recipe = {
        id:0,
        title: this.title,
        category: this.category,
        image: this.image,
        instruction: this.instruction
      };
      this.recipeAdded.emit(newRecipe)
      this.title=''
      this.category=''
      this.image=''
      this.instruction=''
    }
    console.log(this.recipeAdded)
  }
}

