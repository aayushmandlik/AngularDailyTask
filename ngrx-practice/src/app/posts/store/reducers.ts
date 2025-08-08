import { createReducer, on } from "@ngrx/store";
import { PostsStateInterface } from "../types/postsState.interface";
import * as PostActions from './actions'

export const initialState: PostsStateInterface = {
    isLoading: false,
    posts: [],
    error: null

}

export const reducers = createReducer(initialState,
    on(PostActions.getPosts, (state) => ({...state, isLoading: true})),
    on(PostActions.getPostsSuccess, (state,action) => ({...state, isLoading: false, posts:action.posts})),
    on(PostActions.getPostsFailure, (state,action) => ({...state, isLoading: true, error: action.error}))
)