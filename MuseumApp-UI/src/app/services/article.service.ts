import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import _routes from '../../../routes.json';
import { Article } from '../models/Article';
import { Museum } from '../models/Museum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url:string = _routes['serverURL'] + 'Article/';

  currentMuseum: Museum = new Museum();

  private _articleModel = new BehaviorSubject<Article>({} as any);

  constructor(private http: HttpClient) { }


  updateArticleModel(_article:Article){
    this._articleModel.next(_article);
   }

   getArticleModel(){
    return this._articleModel.asObservable();
   }


   getAllArticles(){
    return this.http.get(this.url + 'GetArticles');
   }

   createArticle(_article: Article){
    return this.http.post(this.url + 'Create', _article);
   }

   editArticle(_article: Article){
    return this.http.put(this.url + 'Edit', _article);
   }

   deleteArticle(_articleId: number|undefined){
    return this.http.delete(this.url + 'Delete', {params: {articleId: _articleId as number}});
   }
}
