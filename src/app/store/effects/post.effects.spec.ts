import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PostsEffects } from './posts.effects';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';
import { ApiService } from '../../services/api.service';

describe('PostsEffects', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;
  let mockApiService: jasmine.SpyObj<ApiService>;
  const mockPosts = [
    {
      userId: 1,
      id: 1,
      title: 'Test title',
      body: 'Test body',
    },
  ];

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPosts']);

    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService },
      ],
    });

    effects = TestBed.inject(PostsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadPostsSuccess when API call succeeds', () => {
    actions$ = of(loadPosts());
    mockApiService.getPosts.and.returnValue(of(mockPosts));

    effects.loadPosts$.subscribe((action) => {
      expect(action).toEqual(loadPostsSuccess({ posts: mockPosts }));
    });
  });

  it('should dispatch loadPostsFailure when API call fails', () => {
    actions$ = of(loadPosts());
    mockApiService.getPosts.and.returnValue(throwError(() => 'API Error'));

    effects.loadPosts$.subscribe((action) => {
      expect(action).toEqual(
        loadPostsFailure({ error: 'Error: Unable to get posts.' })
      );
    });
  });
});
