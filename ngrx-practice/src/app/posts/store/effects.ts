import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PostsActions from './actions'
import { PostsService } from "../services/posts.service";
import { catchError, map, mergeMap, of } from "rxjs";
@Injectable()
export class PostsEffect{
    getPosts$ = createEffect(()=>this.actions$.pipe(ofType(PostsActions.getPosts),mergeMap(()=>{
        return this.postsService.getPosts().pipe(map((posts) => PostsActions.getPostsSuccess({posts})),
        catchError((error)=>of(PostsActions.getPostsFailure({error:error.message})))
        )
    })))
    constructor(private actions$: Actions, private postsService: PostsService){}
}