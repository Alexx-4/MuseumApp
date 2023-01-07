import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MuseumService } from 'src/app/services/museum.service';

import routes from '../../../../../routes.json'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
              private router: Router,
              private museumService : MuseumService) { }

  ngOnInit(): void {
  }


  goHome(){
    this.spinner.show();
    this.router.navigate([routes['routeTitlePage']]);
    this.spinner.hide();
  }

  goList(i:number){
    this.museumService.currentMuseumType = this.museumService.types[i];
    this.router.navigate([routes['listMuseums']]);
  }

}
