import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get as _get } from 'lodash';
import { throwError } from 'rxjs';
import { CONSTANTS } from '../shared/constants/constants';
import { Movie } from '../core/typings/movie';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  actorsList: Array<string>;
  directorList: Array<string>;
  genereList: Array<string>;
  hasMore: Boolean = false;
  hasMovieFound: Boolean = false;
  isDone: Boolean = false;
  languageList: Array<string>;
  listOfRatings: Array<Object>;
  myForm: FormGroup;
  originalPlot: string;
  plot: string;
  plots: Array<Object> = [
    { id: 0, name: CONSTANTS.PLOT_SHORT },
    { id: 1, name: CONSTANTS.PLOT_FULL }
  ];
  resultedMovie: Movie;
  writerList: Array<string>;

  constructor(
    private _movieService: MoviesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputPlot: [this.plots[1][CONSTANTS.PLOT_NAME]]
    });
  }
  searchMovies() {
    this._movieService.searchMovies(this.myForm.value.inputTitle, this.myForm.value.inputPlot.toLowerCase())
      .subscribe((res: Movie) => {
        if (res['Response'] !== 'False') {
          this.hasMovieFound = true;
          this.resultedMovie = res;
          this.alterValue(this.resultedMovie);
        } else {
          this.hasMovieFound = false;
          console.log(`Movie Not found!`);
        }
        this.isDone = true;
        this.morePlot();

      }, err => this.handleError(err));
  }
  alterValue(movieDetails) {
    // create actor list
    this.actorsList = movieDetails.Actors ? this.generateList(movieDetails.Actors) : CONSTANTS.NOT_AVAILABLE;
    // create director list
    this.directorList = movieDetails.Director ? this.generateList(movieDetails.Director) : CONSTANTS.NOT_AVAILABLE;
    // create genere list
    this.genereList = movieDetails.Genre ? this.generateList(movieDetails.Genre) : CONSTANTS.NOT_AVAILABLE;
    // create language list
    this.languageList = movieDetails.Language ? this.generateList(movieDetails.Language) : CONSTANTS.NOT_AVAILABLE;
    // create writer list
    this.writerList = movieDetails.Writer ? this.generateList(movieDetails.Writer) : CONSTANTS.NOT_AVAILABLE;
    // create ratings list
    if (movieDetails.Ratings && movieDetails.Ratings.length > 0) {
      this.listOfRatings = movieDetails.Ratings;
    }
    // Assign plot
    this.plot = movieDetails.Plot ? movieDetails.Plot : CONSTANTS.NOT_AVAILABLE;
  }

  // Extract the error in case of error
  handleError(error) {
    this.hasMovieFound = false;
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

  // To make the list by splitting the string based on comma ','
  generateList(data) {
    if (data) {
      return data.split(CONSTANTS.COMMA);
    }
  }

  // To substring the character it's length is more than 200 & show 'Read more' feature
  morePlot() {
    this.originalPlot = this.plot;
    if (this.plot && this.plot.length > CONSTANTS.PLOT_LENGTH) {
      this.hasMore = true;
      this.plot = this.plot.substring(0, CONSTANTS.PLOT_LENGTH - 1);
    } else {
      this.hasMore = false;
    }
  }

  // Acts on the click of 'Read less' & shorten the length to 200
  readLessPlot() {
    this.hasMore = true;
    this.plot = this.plot.substring(0, CONSTANTS.PLOT_LENGTH - 1);
  }

  // Acts on the click of 'Read more' & display complete charater
  readMorePlot() {
    this.hasMore = false;
    this.plot = this.originalPlot;
  }

}
