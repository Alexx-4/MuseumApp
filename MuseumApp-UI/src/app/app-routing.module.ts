import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import _routes from '../../routes.json'
import { ArticleFormComponent } from './components/Article/article-form/article-form.component';
import { ArticleListComponent } from './components/Article/article-list/article-list.component';
import { MuseumFormComponent } from './components/Museum/museum-form/museum-form.component';
import { MuseumListComponent } from './components/Museum/museum-list/museum-list.component';

import { TitlePageComponent } from './components/Presentation/title-page/title-page.component';

const routes: Routes = [
  {path:'', redirectTo:_routes['routeTitlePage'], pathMatch: 'full'},
  {path: _routes['routeTitlePage'], component: TitlePageComponent},

  {path: _routes['listMuseums'], component: MuseumListComponent},
  {path: _routes['formMuseum'], component: MuseumFormComponent},

  {path: _routes['listArticles'], component: ArticleListComponent},
  {path: _routes['formArticle'], component: ArticleFormComponent},

  {path: "**", redirectTo:_routes['routeTitlePage'], pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
