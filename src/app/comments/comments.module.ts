import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentNodeComponent } from './components/comment-node/comment-node.component';
import { CommentInputComponent } from './components/comment-input/comment-input.component';

// Material module
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    CommentTreeComponent,
    CommentsComponent,
    CommentNodeComponent,
    CommentInputComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,

    // Material modules
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CommentsModule { }
