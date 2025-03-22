import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { PostResponse } from '../models/response-models/post-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(environment.baseURL + '/posts').pipe(
      retry({
        count: 3,
        delay: 1000,
      })
    );
  }
}
