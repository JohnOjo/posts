import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';
import { Post } from '../../store/models/post.model';
import {
  selectError,
  selectLoading,
  selectPosts,
} from '../../store/selectors/posts.selectors';
import { loadPosts, setActivePost } from '../../store/actions/posts.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: MockStore;

  const mockPosts: Post[] = [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPosts on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadPosts());
  });

  it('should rotatePostProperties and dispatch setActivePost', () => {
    const post: Post = {
      id: 1,
      title: 'Test Post',
      body: 'Test Body',
      userId: 1,
    };
    component.rotatePostProperties(post);

    expect(store.dispatch).toHaveBeenCalledWith(setActivePost({ id: post.id }));
    expect(component.activePost).toEqual(post);
    expect(component.activePostClicksCount).toBe(1);
  });

  it('should increment activePostClicksCount when clicking the same post', () => {
    const post: Post = {
      id: 1,
      title: 'Test Post',
      body: 'Test Body',
      userId: 1,
    };
    component.rotatePostProperties(post);
    component.rotatePostProperties(post);

    expect(component.activePostClicksCount).toBe(2);
  });

  it('should reset activePostClicksCount when clicking a different post', () => {
    const post1: Post = {
      id: 1,
      title: 'Test Post 1',
      body: 'Test Body 1',
      userId: 1,
    };
    const post2: Post = {
      id: 2,
      title: 'Test Post 2',
      body: 'Test Body 2',
      userId: 2,
    };

    component.rotatePostProperties(post1);
    component.rotatePostProperties(post2);

    expect(component.activePostClicksCount).toBe(1);
  });

  it('should set posts$ observable with data from store', () => {
    store.overrideSelector(selectPosts, mockPosts);
    component.ngOnInit();
    component.posts$.subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });
  });

  it('should set loading$ observable with data from store', () => {
    store.overrideSelector(selectLoading, true);
    component.ngOnInit();
    component.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });

  it('should set error$ observable with data from store', () => {
    const errorMessage = 'Test Error';
    store.overrideSelector(selectError, errorMessage);
    component.ngOnInit();
    component.error$.subscribe((error) => {
      expect(error).toBe(errorMessage);
    });
  });
});
