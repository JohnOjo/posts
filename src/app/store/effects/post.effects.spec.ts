import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PostsEffects } from './posts.effects';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';

describe('PostsEffects', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;
  let mockService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('ApiService', ['getPosts']);

    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockService },
      ],
    });

    effects = TestBed.inject(PostsEffects);
  });

  it('should dispatch loadPostsFailure when API call fails', () => {
    const errorMessage = 'Unable to get posts.';
    actions$ = hot('-a', { a: loadPosts() });
    mockService.getPosts.and.returnValue(
      cold('-#', {}, new Error(errorMessage))
    );

    const expected = cold('--b', {
      b: loadPostsFailure({ error: errorMessage }),
    });

    expect(effects.loadPosts$).toBeObservable(expected);
  });
});
