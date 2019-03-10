import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingProvider } from './app.routes';
import { FeaturedComponent } from './featured/featured.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MoviesService } from './core/services/movies.service';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    FeaturedComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingProvider,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    MoviesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
