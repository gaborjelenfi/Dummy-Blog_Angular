import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  error = null;
  postsSub: Subscription;
  posts: Post[];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.httpService.getPosts().subscribe(posts => this.posts = posts.slice(0, 30),
    error => {
      console.error('Couldn\'t fetch data');
      this.error = error;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe
  }

}
