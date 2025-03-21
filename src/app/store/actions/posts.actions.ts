import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/response-models/post';

export const loadPosts = createAction('[Posts] Load Posts'); // API request
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);
