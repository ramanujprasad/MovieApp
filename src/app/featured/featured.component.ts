import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { CONSTANTS } from '../shared/constants/constants';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  // Pre-defined movies list
  featuredMovie: Array<string> = ['Avatar', 'Batman'];
  movieList: Array<Object> = [];
  isDone: Boolean = false;

  constructor(private _movieService: MoviesService) {}

  ngOnInit() {
    this.featuredMovie.forEach((title) => {
      this._movieService.searchMovies(title, CONSTANTS.PLOT_FULL.toLowerCase()).subscribe(res => {
        if (res['Response'] !== 'False') {
          this.movieList.push(res);
        } else {
          console.log(`Movie Not found!`);
        }
        this.isDone = true;
      }, err => this.handleError(err));
    });
  }

  // Extract the error in case of error
  handleError(error) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
