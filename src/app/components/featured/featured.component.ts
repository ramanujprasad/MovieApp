import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { get as _get } from 'lodash';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { CONSTANTS } from '../../shared/constants'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  // Pre-defined movies list
  featuredMovie: Array<string> = ['Avatar', 'Batman'];
  movieList: Array<Object> = [];
  isDone: boolean = false;

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
    return Observable.throw(errMsg);
  }
}
