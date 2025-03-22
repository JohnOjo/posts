import {
  selectError,
  selectLoading,
  selectPosts,
} from '../selectors/posts.selectors';
import { PostsState } from '../reducers/posts.reducer';

describe('PostSelectors', () => {
  it('should select posts from state', () => {
    const state: PostsState = {
      posts: [
        {
          userId: 1,
          id: 1,
          title: 'Test title',
          body: 'Test body',
        },
      ],
      error: null,
      loading: true,
    };
    expect(selectPosts.projector(state)).toEqual([
      {
        userId: 1,
        id: 1,
        title: 'Test title',
        body: 'Test body',
      },
    ]);
  });

  it('should select loading from state', () => {
    const state: PostsState = {
      posts: [],
      error: null,
      loading: true,
    };
    expect(selectLoading.projector(state)).toBe(true);
  });

  it('should select error from state', () => {
    const state: PostsState = {
      posts: [],
      error: 'Test Error',
      loading: false,
    };
    expect(selectError.projector(state)).toBe('Test Error');
  });
});
