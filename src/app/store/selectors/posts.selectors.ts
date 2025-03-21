import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);
export const selectLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);
