import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment, RawComment, CommentInput } from '../../models/commet.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  public getLoggedInUserId() {
    return 1;
  }

  private getReplies(comments: RawComment[], activeComment: RawComment): Comment {
    return {
      ...activeComment,
      replies: comments
        .filter((c) => c.parentId === activeComment.id)
        .sort(this.sortCommentsDesc)
        .map((c) => this.getReplies(comments, c)),
    }
  }

  private sortCommentsDesc(a: RawComment, b: RawComment) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:3000/comments')
    .pipe(
      map((comments: RawComment[]) => {
        const commentsWithReplies = comments
        .filter((comment) => comment.parentId === null)
        .sort(this.sortCommentsDesc)
        .map((rootComment) => this.getReplies(comments, rootComment));
        return commentsWithReplies;
      })
    )
  }

  public postComment(text: string, parentId?: number): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:3000/comments', new CommentInput(text, parentId))
      .pipe(
        map((comment: RawComment) => {
          return {
            ...comment,
            replies: [],
          }
        })
      )
  }

  public editComment(comment: Comment, newText: string) {
    return this.http.patch<Comment>(`http://localhost:3000/comments/${comment.id}`, { text: newText});
  }

  public deleteComment(comment: Comment) {
    return this.http.delete(`http://localhost:3000/comments/${comment.id}`);
  }
}
