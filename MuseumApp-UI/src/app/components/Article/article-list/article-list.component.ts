import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { Museum } from 'src/app/models/Museum';
import { ArticleService } from 'src/app/services/article.service';
import { MuseumService } from 'src/app/services/museum.service';

import routes from '../../../../../routes.json';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articlesList : Article[] = [];
  _article: Article = new Article();
  currentMuseum: Museum = new Museum();

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs!: Observable<any>;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              public articleService: ArticleService,
              private museumService: MuseumService,
              private toastr: ToastrService) {

      router.routeReuseStrategy.shouldReuseRoute = () => false;
               }


  ngOnInit(): void {
    this.articleService.updateArticleModel({} as Article);

    this.museumService.getMuseumModel().subscribe(
      (data)=>{
        this.currentMuseum = data;
        this.getArticles();
      }
    )
  }

  setPagination(tableData:any) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs = this.dataSource.connect();
  }

  getArticles(){
      this.articleService.getAllArticles().subscribe({
        next: (data)=>{
          var allArticles = data as Article[];
          var _museumId:number = this.currentMuseum.id as number;
          this.articlesList = allArticles.filter(a=>a.museumId === _museumId);
          this.setPagination(this.articlesList);
        },
        error: (err) => {
          console.log('Error in getAllArticles')
        }
      });
  }

  editArticle(event: MouseEvent, article: Article) {
    event.stopPropagation();
    this.articleService.updateArticleModel(article);
    this.router.navigate([routes['formArticle']]);
  }

  goCreateArticle(){
    this.router.navigate([routes['formArticle']]);
  }

  deleteArticle(event: MouseEvent, article: Article | undefined) {
    this.articleService.deleteArticle(article?.id).subscribe({
      next:()=>{
        this.getArticles();
        this.toastr.info('Article deleted');
      },
      error: () => {this.toastr.error('Error from server. Try again');
                    }
    })
  }

}
