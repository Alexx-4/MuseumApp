import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { Museum } from 'src/app/models/Museum';
import { ArticleService } from 'src/app/services/article.service';
import { MuseumService } from 'src/app/services/museum.service';

import routes from '../../../../../routes.json';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  ArticleForm: FormGroup;

  suscription: Subscription = new Subscription();
  museums: Museum[] = [];

  articleId: number | undefined = 0;
  museumId: number | undefined = 0;

  constructor(formBuilder: FormBuilder,
              private articleService: ArticleService,
              private router: Router,
              private toastr:ToastrService,
              private spinner: NgxSpinnerService,
              private museumService: MuseumService) {

    this.ArticleForm = formBuilder.group({
              name: ['', Validators.required],
              description: ['', Validators.required],
              museum: ['', Validators.required],
              damaged: [false, Validators.required]
    });
               }

  ngOnInit(): void {
    this.getMuseums();
  }

  getAtrr(atrr:string){
    return this.ArticleForm.get(atrr);
  }

  goArticlesList(){
    this.museumService.updateMuseumModel(this.museums.find(m=>m.id === this.museumId) as Museum);
    this.router.navigate([routes['listArticles']]);
  }

  goMuseumList(){
    this.router.navigate([routes['listMuseums']]);
  }

  saveArticle(){
    var create:boolean = this.articleId === 0;

    var _article:Article = {
      id: (create) ? undefined : this.articleId,
      name: this.getAtrr('name')?.value,
      description: this.getAtrr('description')?.value,
      museumId: this.museumId as number,
      damaged: this.getAtrr('damaged')?.value
    }

    if(create){
      console.log(_article);
      this.articleService.createArticle(_article).subscribe({
        next:()=>{
          this.goArticlesList();
          this.toastr.info('Article created successfully');
        },
        error: () => {this.toastr.error('Error from server. Try again');
                      }
      });
    }
    else{
      this.articleService.editArticle(_article).subscribe({
        next: ()=>{
          this.articleId = 0;
          this.goArticlesList();
          this.toastr.info('Article edited successfully');
        },
        error: () => {this.toastr.error('Error from server. Try again');
                      }
      })
    }
  }

  getMuseums(){
    this.museumService.getAllMuseums().subscribe({
      next: data =>{
        this.museums = data as Museum[];
        this.getArticleModel();
      },
      error:err=>{
        this.toastr.info('Error from server');
      }
    })
  }

  getArticleModel(){
    this.suscription = this.articleService.getArticleModel().subscribe({
      next:(data)=>{
        if(data.name){
          var _museum = this.museums.find(m=>m.id === data.museumId);

          this.ArticleForm.patchValue({
            name: data.name,
            description: data.description,
            damaged: data.damaged,
            museum: _museum?.name
          });
          this.articleId = data.id;


        }
      }});
  }

}
