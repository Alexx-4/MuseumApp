import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import _routes from '../../../routes.json';
import { Museum } from '../models/Museum';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  url:string = _routes['serverURL'] + 'Museum/';

  currentMuseumType = 'All';
  types = ['All', 'Art', 'History', 'Natural Science'];

  private _museumModel = new BehaviorSubject<Museum>({} as any);

  constructor(private http: HttpClient) { }


  updateMuseumModel(_museum:Museum){
    this._museumModel.next(_museum);
   }

   getMuseumModel(){
    return this._museumModel.asObservable();
   }


   getAllMuseums(){
    return this.http.get(this.url + 'GetMuseums');
   }

   createMuseum(_museum: Museum){
    return this.http.post(this.url + 'Create', _museum);
   }

   editMuseum(_museum: Museum){
    return this.http.put(this.url + 'Edit', _museum);
   }

   deleteMuseum(_museum: Museum | undefined){
    return this.http.delete(this.url + 'Delete', {body: _museum});
   }
}
