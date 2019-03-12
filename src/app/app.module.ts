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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { TranslateService } from './core/services/translate.service';
import { TranslationProvider } from './core/internationalization/translations';
import { TranslatePipe } from './core/internationalization/translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FeaturedComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SearchComponent,
    TranslatePipe
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
    MoviesService,
    TranslationProvider,
    TranslateService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
