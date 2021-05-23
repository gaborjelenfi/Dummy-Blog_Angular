import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Post } from '../post';
import { PostComment } from '../comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) commentForm: NgForm;

  idSub: Subscription;
  postSub: Subscription;
  commentSub: Subscription;
  addCommentSub: Subscription;
  postId: string;
  post: Post;
  comments: PostComment[];
  fullName = 'John Doe';
  website = 'google.com';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.idSub = this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      this.getPost(this.postId);
      this.getComments(this.postId);
    });
  }

  getPost(id: string) {
    this.postSub = this.httpService.getPost(id).subscribe(post => this.post = post);
  }

  getComments(id: string) {
    this.commentSub = this.httpService.getComments().subscribe(comments => this.comments = comments.filter(c => c.postId === +id).reverse());
  }

  onSubmit() {
    const data = {
      "body": this.commentForm.value.commenterText,
      "email": this.commentForm.value.commenterEmail,
      "name": this.commentForm.value.commenterName,
      "postId": +this.postId
    }
    this.addCommentSub = this.httpService.addComment(data).subscribe(data => this.comments.unshift(data));
    this.commentForm.reset();
  }

  ngOnDestroy() {
    this.idSub.unsubscribe;
    this.postSub.unsubscribe;
    this.commentSub.unsubscribe;
    this.addCommentSub.unsubscribe;
  }
}
