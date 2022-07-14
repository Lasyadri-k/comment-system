import { Author } from './author.model';

export interface RawComment {
  id: number;
  parentId: null | number;
  text: string;
  createdAt: string;
  author: Author;
}

export class CommentInput {
  text: string;
  parentId: null | number;
  createdAt: string;
  author: Author;

  constructor(text: string, parentId?: number) {
    this.text = text;
    this.parentId = parentId || null;
    // No need to add below keys in actual API implementation
    this.createdAt = new Date().toISOString();
    this.author = {
      userId: 1,
      name: 'Lasya',
    }
  }
}

export interface Comment extends RawComment {
  isEditing?: boolean;
  isReplying?: boolean;
  replies: Comment[] | undefined;
}
