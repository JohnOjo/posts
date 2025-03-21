import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { Post } from '../../models/response-models/post';
import { Store } from '@ngrx/store';
import { loadPosts, setActivePost } from '../../store/actions/posts.actions';
import {
  selectError,
  selectLoading,
  selectPosts,
} from '../../store/selectors/posts.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private store = inject(Store);

  posts$: Observable<any[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  activePost: Post | null = null;
  activePostClicksCount: number = 0;

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  rotatePostProperties(post: Post): void {
    this.store.dispatch(setActivePost({ id: post.id }));

    if (this.activePost?.id === post?.id) {
      this.activePostClicksCount++;
    } else {
      this.activePostClicksCount = 1;
    }
    this.activePost = post;
  }
}
