import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './base/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'comments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./comments/comments.module').then((m) => m.CommentsModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
