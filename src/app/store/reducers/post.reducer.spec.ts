import { postsReducer, PostsState } from '../reducers/posts.reducer';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';

describe('PostReducer', () => {
  it('should set error when loadPostsFailure is dispatched', () => {
    const initialState: PostsState = {
      posts: [],
      error: null,
      loading: false,
    };
    const errorMessage = 'API error occurred';
    const newState = postsReducer(
      initialState,
      loadPostsFailure({ error: errorMessage })
    );

    expect(newState.error).toBe(errorMessage);
  });

  it('should clear error when loadPosts is dispatched', () => {
    const initialState: PostsState = {
      posts: [],
      error: 'Previous error',
      loading: false,
    };
    const newState = postsReducer(initialState, loadPosts());

    expect(newState.error).toBeNull();
  });
});
