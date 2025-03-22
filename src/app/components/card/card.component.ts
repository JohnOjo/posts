import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Post } from '../../models/response-models/post';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() post: Post = new Post();
  @Input() activePostClicksCount: number = 0;
  postProperties: ReadonlyArray<string> = ['title', 'userId', 'id', 'body'];
}
