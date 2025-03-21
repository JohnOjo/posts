import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';
import { Post } from '../../models/response-models/post';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({ ...state, loading: true, error: null })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    posts,
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
