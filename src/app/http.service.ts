import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';
import { PostComment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`);
  }

  getComments(): Observable<PostComment[]> {
    return this.http.get<PostComment[]>('http://localhost:3000/comments');
  }

  addComment(newComment: PostComment): Observable<PostComment> {
    return this.http.post<PostComment>('http://localhost:3000/comments', newComment, this.httpOptions);
  }
}
