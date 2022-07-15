import { Author } from './author.model';
import { Injector } from '@angular/core';
import { StorageService } from 'src/app/base/services/storage/storage.service';

const storageService = new StorageService();

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
    const userInfo = JSON.parse(storageService.getLocalStorageValue('userInfo') || '{}');
    this.createdAt = new Date().toISOString();
    this.author = {
      userId: userInfo.sub,
      name: userInfo.name,
    }
  }
}

export interface Comment extends RawComment {
  isEditing?: boolean;
  isReplying?: boolean;
  replies: Comment[] | undefined;
}
