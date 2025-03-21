import * as fromPostActions from '../actions/posts.actions';
import { Post } from '../models/post.model';

describe('Post Actions', () => {
  it('should create a LoadPosts action', () => {
    const action = fromPostActions.loadPosts();
    expect(action.type).toBe('[Posts] Load Posts');
  });

  it('should create a LoadPostsSuccess action with posts', () => {
    const mockPosts: Post[] = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
    ];

    const action = fromPostActions.loadPostsSuccess({ posts: mockPosts });

    expect(action.type).toBe('[Posts] Load Posts Success');
    expect(action.posts).toEqual(mockPosts);
  });

  it('should create a LoadPostsFailure action with an error message', () => {
    const errorMessage = 'Failed to load posts';

    const action = fromPostActions.loadPostsFailure({ error: errorMessage });

    expect(action.type).toBe('[Posts] Load Posts Failure');
    expect(action.error).toBe(errorMessage);
  });

  it('should create a SetActivePost action with an id', () => {
    const postId = 1;

    const action = fromPostActions.setActivePost({ id: postId });

    expect(action.type).toBe('[Post List] Set Active Post');
    expect(action.id).toBe(postId);
  });
});
