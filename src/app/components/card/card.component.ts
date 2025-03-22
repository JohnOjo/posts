import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Post } from '../../store/models/post.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() post?: Post;
  @Input() activePostClicksCount: number = 0;
  postProperties: ReadonlyArray<string> = ['title', 'userId', 'id', 'body'];
}
