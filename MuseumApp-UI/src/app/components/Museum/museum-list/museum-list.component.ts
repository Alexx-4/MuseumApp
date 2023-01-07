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
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {
  museumsList : Museum[] = [];
  _museum: Museum = new Museum();

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs!: Observable<any>;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              public museumService: MuseumService,
              private toastr: ToastrService,
              private articleService: ArticleService) {

      router.routeReuseStrategy.shouldReuseRoute = () => false;
               }


  ngOnInit(): void {
    this.museumService.updateMuseumModel({} as Museum);
    this.articleService.updateArticleModel({} as Article);
    this.getMuseums();
  }

  setPagination(tableData:any) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs = this.dataSource.connect();
  }

  getMuseums(){
      this.museumService.getAllMuseums().subscribe({
        next: (data)=>{
          var allMuseums = data as Museum[];
          var _type:string = this.museumService.currentMuseumType;
          this.museumsList = _type === 'All'? allMuseums :
                                             allMuseums.filter(m=>m.type === _type)
          this.setPagination(this.museumsList);
        },
        error: (err) => {
          console.log('Error in getAllMuseums')
        }
      });
  }

  editMuseum(event: MouseEvent, museum: Museum) {
    event.stopPropagation();
    this.museumService.updateMuseumModel(museum);
    this.router.navigate([routes['formMuseum']]);
  }

  goCreateMuseum(){
    this.router.navigate([routes['formMuseum']]);
  }

  deleteMuseum(event: MouseEvent, museum: Museum | undefined) {
    this.museumService.deleteMuseum(museum).subscribe({
      next:()=>{
        this.getMuseums();
        this.toastr.info('Museum deleted');
      },
      error: () => {this.toastr.error('Error from server. Try again');
                    }
    })
  }

  goArticlesList(museum: Museum){
    this.museumService.updateMuseumModel(museum);
    this.router.navigate([routes['listArticles']]);
  }

  goCreateArticle(){
    this.router.navigate([routes['formArticle']]);
  }


}
