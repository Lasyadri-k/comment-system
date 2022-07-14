import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments/comments.service';
import { Comment } from '../../models/commet.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments: Comment[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  private getComments() {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
    })
  }

  public submitNewComment(text: string) {
    this.commentsService.postComment(text).subscribe((newComment: Comment) => {
      this.comments = [newComment, ...this.comments];
    }, (error) => {
      console.error('Unable to post comment', error);
    })
  }

  public submitReply(event: {parentComment: Comment, replyText: string }) {
    const { parentComment, replyText } = event;
    this.commentsService.postComment(replyText, parentComment.id).subscribe((newReply: Comment) => {
      this.getComments();
    }, (error) => {
      console.error('Unable to post reply', error);
    })
  }

  public deleteComment(comment: Comment) {
    this.commentsService.deleteComment(comment).subscribe(() => {
      this.getComments();
    }, (error) => {
      console.error('Unable to delete comment', error);
    })
  }

  public editComment(event: { comment: Comment, newText: string }) {
    const { comment, newText } = event;
    this.commentsService.editComment(comment, newText).subscribe((newReply: Comment) => {
      this.getComments();
    }, (error) => {
      console.error('Unable to post reply', error);
    })
  }
}
