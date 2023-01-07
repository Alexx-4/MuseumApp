import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Museum } from 'src/app/models/Museum';
import { MuseumService } from 'src/app/services/museum.service';

import routes from '../../../../../routes.json';

@Component({
  selector: 'app-museum-form',
  templateUrl: './museum-form.component.html',
  styleUrls: ['./museum-form.component.css']
})
export class MuseumFormComponent implements OnInit {

  MuseumForm: FormGroup;

  suscription: Subscription = new Subscription();

  museumId: number | undefined = 0;
  types: string[];

  constructor(formBuilder: FormBuilder,
              private museumService: MuseumService,
              private router: Router,
              private toastr:ToastrService,
              private spinner: NgxSpinnerService) {

    this.MuseumForm = formBuilder.group({
              name: ['', Validators.required],
              type: ['', Validators.required],
              address: ['', Validators.required]
    });

    this.types = museumService.types.slice(1);
               }

  ngOnInit(): void {
    this.suscription = this.museumService.getMuseumModel().subscribe({
      next:(data)=>{
        if(data.name){
          this.MuseumForm.patchValue({
            name: data.name,
            address: data.address,
            type: data.type
          });
          this.museumId = data.id;
        }
      }});
  }

  getAtrr(atrr:string){
    return this.MuseumForm.get(atrr);
  }

  goMuseumsList(){
    this.router.navigate([routes['listMuseums']]);
  }

  saveMuseum(){
    var create:boolean = this.museumId === 0;

    var _museum:Museum = {
      id: (create) ? undefined : this.museumId,
      name: this.getAtrr('name')?.value,
      address: this.getAtrr('address')?.value,
      type: this.getAtrr('type')?.value
    }

    if(create){
      this.museumService.createMuseum(_museum).subscribe({
        next:()=>{
          this.goMuseumsList();
          this.toastr.info('Museum created successfully');
        },
        error: () => {this.toastr.error('Error from server. Try again');
                      }
      });
    }
    else{
      this.museumService.editMuseum(_museum).subscribe({
        next: ()=>{
          this.museumId = 0;
          this.goMuseumsList();
          this.toastr.info('Museum edited successfully');
        },
        error: () => {this.toastr.error('Error from server. Try again');
                      }
      })
    }
  }

}
