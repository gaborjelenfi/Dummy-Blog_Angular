import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  idSub: Subscription;
  postSub: Subscription;
  postId: string;
  post: Post;
  fullName: 'John Doe';
  website: 'google.com';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.idSub = this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      this.getPost(this.postId);
    });
  }

  getPost(id: string) {
    this.postSub = this.httpService.getPost(id).subscribe(post => {
      console.log(post);
      this.post = post});
  }

  ngOnDestroy() {
    this.idSub.unsubscribe;
    this.postSub.unsubscribe;
  }
}
