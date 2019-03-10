import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get as _get } from 'lodash';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  actorsList: Array<string>;
  awards: string;
  directorList: Array<string>;
  genereList: Array<string>;
  hasMore: boolean = false;
  hasMovieFound: boolean = false;
  imdbRating: string;
  imdbVotes: number;
  isDone: boolean = false;
  languageList: Array<string>;
  listOfRatings: Array<Object>;
  myForm: FormGroup;
  originalPlot:string;
  plot: string;
  plots: Array<Object> = [
    { id: 0, name: CONSTANTS.PLOT_SHORT },
    { id: 1, name: CONSTANTS.PLOT_FULL }
  ];
  poster: string;
  rated: string;
  released: string;
  runtime: string;
  title: string;
  type: string;
  writerList: Array<string>;
  year: string;
 
  constructor(
    private _movieService: MoviesService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit() {
    this.myForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputPlot: [this.plots[1][CONSTANTS.PLOT_NAME]]
    })
  }
  searchMovies() {
    this._movieService.searchMovies(this.myForm.value.inputTitle, this.myForm.value.inputPlot.toLowerCase())
      .subscribe(res => {
        if (res['Response'] !== 'False') {
          this.hasMovieFound = true;
          this.title = _get(res, CONSTANTS.MOVIE_TITLE);
          this.year = _get(res, CONSTANTS.MOVIE_YEAR);
          this.rated = _get(res, CONSTANTS.MOVIE_RATED);
          this.rated = _get(res, CONSTANTS.MOVIE_RUNTIME);
          this.released = _get(res, CONSTANTS.MOVIE_RELEASED);
          this.plot = _get(res, CONSTANTS.MOVIE_PLOT);
          this.awards = _get(res, CONSTANTS.MOVIE_AWARDS);
          this.poster = _get(res, CONSTANTS.MOVIE_POSTER);
          this.imdbRating = _get(res, CONSTANTS.MOVIE_IMDBRATINGS);
          this.imdbVotes = _get(res, CONSTANTS.MOVIE_IMDBVOTES);
          this.type = _get(res, CONSTANTS.MOVIE_TYPE);
          if (res[CONSTANTS.MOVIE_GENRE]) {
            this.genereList = this.generateList(res[CONSTANTS.MOVIE_GENRE]);
          }
          if (res[CONSTANTS.MOVIE_DIRECTOR]) {
            this.directorList = this.generateList(res[CONSTANTS.MOVIE_DIRECTOR]);
          }
          if (res[CONSTANTS.MOVIE_WRITER]) {
            this.writerList = this.generateList(res[CONSTANTS.MOVIE_WRITER]);
          }
          if (res[CONSTANTS.MOVIE_ACTORS]) {
            this.actorsList = this.generateList(res[CONSTANTS.MOVIE_ACTORS]);
          }
          if (res[CONSTANTS.MOVIE_LANGUAGE]) {
            this.languageList = this.generateList(res[CONSTANTS.MOVIE_LANGUAGE]);
          }
          if (res[CONSTANTS.MOVIE_RATINGS] && res[CONSTANTS.MOVIE_RATINGS].length > 0) {
            this.listOfRatings = res[CONSTANTS.MOVIE_RATINGS];
          }
        } else {
          this.hasMovieFound = false;
          console.log(`Movie Not found!`);
        }
        
        this.isDone = true;
        this.morePlot();

      }, err => this.handleError(err));
  }
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
    return Observable.throw(errMsg);
  }

  // To make the list by splitting the string based on comma ','
  generateList(data) {
    if (data) {
      return data.split(CONSTANTS.COMMA);
    }
  }
  
  // To substring the character it's length is more than 200 & show 'Read more' feature
  morePlot(){
    this.originalPlot = this.plot
    if (this.plot && this.plot.length > CONSTANTS.PLOT_LENGTH) {
      this.hasMore = true;
      this.plot = this.plot.substring(0, CONSTANTS.PLOT_LENGTH-1);
    } else {
      this.hasMore = false;
    }
  }

  // Acts on the click of 'Read less' & shorten the length to 200
  readLessPlot(){
    this.hasMore = true;
    this.plot = this.plot.substring(0, CONSTANTS.PLOT_LENGTH-1);
  }

  // Acts on the click of 'Read more' & display complete charater
  readMorePlot(){
    this.hasMore = false;
    this.plot = this.originalPlot;
  }

}
