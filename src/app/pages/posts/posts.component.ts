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
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  animations: [
    trigger('bounce', [
      transition('void => *', [
        animate(
          '{{delay}}',
          keyframes([
            style({ transform: 'scale(1,1) translateY(0)' }),
            style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
            style({ transform: 'scale(0.9, 1.1) translateY(-35px)' }),
            style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
            style({ transform: 'scale(1,1) translateY(-7px)' }),
            style({ transform: 'scale(1,1) translateY(0)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PostsComponent implements OnInit {
  private store = inject(Store);
  posts$: Observable<any[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  activePost: Post | null = null;
  activePostClicksCount: number = 0;
  bouncAnimationDelays: number[] = [1,2,3,4]

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
