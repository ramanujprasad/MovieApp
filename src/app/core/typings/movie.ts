import { Rating } from './rating';
export class Movie {
  constructor(
    public Title: string,
    public Year: string,
    public Poster: string,
    public Rated: string,
    public Released: string,
    public Runtime: string,
    public Genre: string,
    public Director: string,
    public Writer: string,
    public Actors: string,
    public Plot: string,
    public Language: string,
    public Country: string,
    public Awards: string,
    public imdbRating: string,
    public imdbVotes: string,
    public Type: string,
    public Production: string,
    public Ratings: Rating[]
  ) {}
}
