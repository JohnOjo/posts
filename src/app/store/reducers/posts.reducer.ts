import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  setActivePost,
} from '../actions/posts.actions';
import { Post } from '../models/post.model';

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
  })),
  on(setActivePost, (state, { id }) => ({
    ...state,
    posts: state.posts.map((post) => ({
      ...post,
      active: post.id === id,
    })),
  }))
);
