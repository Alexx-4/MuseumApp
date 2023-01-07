import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TitlePageComponent } from './components/Presentation/title-page/title-page.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/Presentation/footer/footer.component';
import { HeaderComponent } from './components/Presentation/header/header.component';


import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatRadioModule} from '@angular/material/radio';

import { JwtModule } from "@auth0/angular-jwt";
import { NgxSpinnerModule } from "ngx-spinner";
import { MuseumListComponent } from './components/Museum/museum-list/museum-list.component';
import { MuseumFormComponent } from './components/Museum/museum-form/museum-form.component';
import { ArticleListComponent } from './components/Article/article-list/article-list.component';
import { ArticleFormComponent } from './components/Article/article-form/article-form.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    FooterComponent,
    HeaderComponent,
    MuseumListComponent,
    MuseumFormComponent,
    ArticleListComponent,
    ArticleFormComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatRadioModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
