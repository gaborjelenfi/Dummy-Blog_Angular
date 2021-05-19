import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpService) {}
  posts: Post[];

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.httpService.getPosts().subscribe(posts => this.posts = posts);
  }

}
