import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PostsService } from './services/posts.service';
import { PostsComponent } from './components/posts/posts.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './store/effects';



@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,StoreModule.forFeature('posts',reducers),EffectsModule.forFeature([PostsEffect])
  ],
  providers:[PostsService],
  exports: [PostsComponent]
})
export class PostsModule { }
