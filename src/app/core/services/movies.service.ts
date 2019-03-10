import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesService {
  private searchUrl = 'https://www.omdbapi.com/';
  private apiKey = '6c3a2d45';

  constructor (private httpClient: HttpClient) {}

  searchMovies(title: string, plot: string) {
    const searchUrl = `${this.searchUrl}?apiKey=${this.apiKey}&t=${title}&plot=${plot}`;
    return this.httpClient.get(searchUrl, {responseType: 'json'});
  }

}

