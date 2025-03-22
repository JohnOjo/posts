import { selectError } from '../selectors/posts.selectors';
import { PostsState } from '../reducers/posts.reducer';

describe('PostSelectors', () => {
  it('should select error from state', () => {
    const state: PostsState = {
      posts: [],
      error: 'Test Error',
      loading: false,
    };
    expect(selectError.projector(state)).toBe('Test Error');
  });
});
