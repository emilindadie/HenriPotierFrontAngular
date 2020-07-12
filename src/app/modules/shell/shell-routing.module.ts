import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      {
        path: '', redirectTo: 'articles',
      },
      {
        path: 'articles', loadChildren: () => import('../article/article.module').then(m => m.ArticleModule),
      },
      {
        path: 'panier', loadChildren: () => import('../panier/panier.module').then(m => m.PanierModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
