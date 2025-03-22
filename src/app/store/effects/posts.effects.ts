import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from '../actions/posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.apiService.getPosts().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((_) =>
            of(loadPostsFailure({ error: 'Error: Unable to get posts.' }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
