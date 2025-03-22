import {
  initialState,
  postsReducer,
  PostsState,
} from '../reducers/posts.reducer';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';
import { Post } from '../models/post.model';

describe('PostReducer', () => {
  const mockPosts: Post[] = [
    {
      userId: 1,
      id: 1,
      title: 'Test title',
      body: 'Test body',
    },
  ];

  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const newState = postsReducer(initialState, action);

    expect(newState).toBe(initialState);
  });

  it('should set posts when loadPosts is dispatched', () => {
    const action = loadPostsSuccess({ posts: mockPosts });
    const newState = postsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.posts).toEqual(mockPosts);
  });

  it('should set loading to true and clear error on loadPosts', () => {
    const action = loadPosts();
    const newState = postsReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should set error when loadPostsFailure is dispatched', () => {
    const errorMessage = 'API error occurred';
    const newState = postsReducer(
      initialState,
      loadPostsFailure({ error: errorMessage })
    );

    expect(newState.loading).toBe(false);
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
