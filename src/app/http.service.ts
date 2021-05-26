import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';
import { PostComment } from './comment';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(env.POSTS_URL);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${env.POSTS_URL}/${id}`);
  }

  getComments(): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(env.COMMENTS_URL);
  }

  addComment(newComment: PostComment): Observable<PostComment> {
    return this.http.post<PostComment>(env.COMMENTS_URL, newComment, this.httpOptions);
  }
}

