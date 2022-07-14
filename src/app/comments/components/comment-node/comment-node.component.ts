import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/commet.model';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-comment-node',
  templateUrl: './comment-node.component.html',
  styleUrls: ['./comment-node.component.scss']
})
export class CommentNodeComponent implements OnInit {
  @Input()
  public comment!: Comment;

  @Output()
  private edit = new EventEmitter<string>();
  @Output()
  private reply = new EventEmitter<void>();
  @Output()
  private delete = new EventEmitter<void>();

  public canEdit = false;
  public canDelete = false;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    if (this.comment.author.userId === this.commentsService.getLoggedInUserId()) {
      this.canEdit = true;
      this.canDelete = !this.comment.replies?.length;
    }
  }

  /**
   * onEdit
   */
  public onEdit() {
    this.comment.isEditing = !this.comment.isEditing;
    // this.edit.emit()
  }

  /**
   * reply
   */
  public onReply() {
    this.reply.emit();
  }

  /**
   * delete
   */
  public onDelete() {
    this.delete.emit();
  }

  /**
   * onSubmitEdit
   */
  public onSubmitEdit(newText: string) {
    this.comment.isEditing = false;
    this.edit.emit(newText);
  }

}
