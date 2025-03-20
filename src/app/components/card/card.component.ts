import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Post } from '../../models/response-models/post';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() post: Post = new Post();
  @Input() activePostClicksCount: number = 0;
  @Output() postClickEvent = new EventEmitter<Post>();
  postProperties: string[] = ['title', 'userId', 'id', 'body'];

  selectPost(post: Post) {
    this.post.active = true;
    this.postClickEvent.emit(post);
  }
}
