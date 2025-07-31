import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe!:Recipe
  @Output() delete = new EventEmitter<number>();
  constructor(private dialog: MatDialog){}

  openInstructions(){
    this.dialog.open(RecipeDetailComponent,{
      width: '400px',
      data: this.recipe
    })
  }

  onDelete(){
    this.delete.emit(this.recipe.id)
  }
}
