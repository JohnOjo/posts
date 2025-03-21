import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { ApiService } from '../../services/api.service';
import { Post } from '../../models/response-models/post';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../store/actions/posts.actions';
import {
  selectError,
  selectLoading,
  selectPosts,
} from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-posts',
  imports: [CardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private store = inject(Store);

  posts$: Observable<Post[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  destroy$ = new Subject<void>();
  loading: boolean = true;
  posts: Post[] = [];
  activePost: Post | null = null;
  activePostClicksCount: number = 0;

  constructor(private apiService: ApiService) {
    this.store.dispatch(loadPosts());
    this.getPosts();
  }

  ngOnInit() {}

  getPosts(): void {
    this.apiService
      .getPosts()
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe({
        next: (response: Post[]) => {
          this.loading = false;
          this.posts = response;
        },
        error: (_) => {
          this.loading = false;
          // TODO: display error
        },
      });
  }

  rotatePostProperties(post: Post): void {
    this.posts.forEach((postItem) => {
      delete postItem.active;
    });

    post.active = true;

    if (this.activePost?.id === post?.id) {
      this.activePostClicksCount++;
    } else {
      this.activePostClicksCount = 1;
    }
    this.activePost = post;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
