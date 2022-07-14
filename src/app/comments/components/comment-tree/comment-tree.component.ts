import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/commet.model';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input()
  public comments: Comment[] = [];

  @Output()
  private postReply = new EventEmitter<{ parentComment: Comment, replyText: string }>()
  @Output()
  private edit = new EventEmitter<{ comment: Comment, newText: string}>();
  @Output()
  private delete = new EventEmitter<Comment>();

  constructor() { }

  ngOnInit(): void {
  }

  public getReplies(comment: Comment) {
    return comment.replies as Comment[];
  }

  /**
   * name
   */
  public onPostReply(parentComment: Comment, replyText: string) {
    this.postReply.emit({ parentComment, replyText });
  }

  public onDeleteComment(comment: Comment) {
    this.delete.emit(comment);
  }

  /**
   * onEditComment
   */
  public onEditComment(comment: Comment, newText: string) {
    this.edit.emit({ comment, newText });
  }
}
