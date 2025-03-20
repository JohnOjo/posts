import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { ApiService } from '../../services/api.service';
import { Post } from '../../models/response-models/post';

@Component({
  selector: 'app-posts',
  imports: [CardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  destroy$ = new Subject<void>();
  loading: boolean = true;
  posts: Post[] = [];
  activePost: Post | null = null;
  activePostClicksCount: number = 0;

  constructor(private apiService: ApiService) {
    this.getPosts();
  }

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
